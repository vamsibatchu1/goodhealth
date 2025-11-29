/**
 * Migration utility to fix date misalignment
 * This will move data from one date to the correct date (one day forward)
 */

import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";
import { DailyData } from "@/types";

const USER_ID = "default-user";
const DAILY_DATA_COLLECTION = `users/${USER_ID}/dailyData`;

/**
 * Remove undefined values from an object (Firebase doesn't allow undefined)
 */
function removeUndefined(obj: any): any {
  const cleaned: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

/**
 * Migrate all daily data documents to correct dates
 * If date N has data that should be in date N-1, move it backward
 * This fixes the issue where data was saved one day ahead
 */
export async function migrateDailyDataDates(): Promise<void> {
  try {
    console.log("🔄 Starting date migration...");
    
    const collectionRef = collection(db, DAILY_DATA_COLLECTION);
    const snapshot = await getDocs(collectionRef);
    
    // Sort documents by date (oldest first) to process in order
    const documents = snapshot.docs
      .map((docSnap) => ({
        id: docSnap.id,
        data: docSnap.data(),
      }))
      .filter((doc) => /^\d{4}-\d{2}-\d{2}$/.test(doc.id))
      .sort((a, b) => a.id.localeCompare(b.id));
    
    console.log(`📋 Found ${documents.length} documents to process`);
    
    // Process from newest to oldest to avoid overwriting issues
    // Move data from date N to date N-1 (backward by one day)
    for (let i = documents.length - 1; i >= 0; i--) {
      const docInfo = documents[i];
      const currentDate = docInfo.id;
      
      // Calculate the target date (one day backward)
      const date = new Date(currentDate + "T00:00:00");
      date.setDate(date.getDate() - 1);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const targetDate = `${year}-${month}-${day}`;
      
      // Check if we have any data to migrate
      const hasData = docInfo.data.weight || docInfo.data.burned || docInfo.data.food;
      
      if (!hasData) {
        console.log(`⏭️ Skipping ${currentDate} - no data`);
        continue;
      }
      
      const fromDocRef = doc(db, `${DAILY_DATA_COLLECTION}/${currentDate}`);
      const toDocRef = doc(db, `${DAILY_DATA_COLLECTION}/${targetDate}`);
      
      // Prepare corrected data with updated date fields
      // Only include fields that have actual values (not undefined or null)
      const correctedData: any = {};
      
      if (docInfo.data.weight && docInfo.data.weight.weight !== undefined) {
        correctedData.weight = removeUndefined({
          ...docInfo.data.weight,
          date: targetDate,
        });
      }
      
      if (docInfo.data.burned && docInfo.data.burned.burned !== undefined) {
        correctedData.burned = removeUndefined({
          ...docInfo.data.burned,
          date: targetDate,
        });
      }
      
      if (docInfo.data.food && docInfo.data.food.items) {
        correctedData.food = removeUndefined({
          ...docInfo.data.food,
          date: targetDate,
        });
      }
      
      // Check if target document already exists
      const targetDoc = documents.find((d) => d.id === targetDate);
      
      // Prepare clean data object (only include defined fields)
      const cleanData: any = { date: targetDate };
      
      if (targetDoc && targetDoc.data) {
        // Merge with existing data - prefer the data we're moving (it's more recent)
        const existingData = targetDoc.data;
        
        // Only include weight if it exists and has valid data
        if (correctedData.weight) {
          cleanData.weight = correctedData.weight;
        } else if (existingData.weight && existingData.weight.weight !== undefined) {
          cleanData.weight = removeUndefined(existingData.weight);
        }
        
        // Only include burned if it exists and has valid data
        if (correctedData.burned) {
          cleanData.burned = correctedData.burned;
        } else if (existingData.burned && existingData.burned.burned !== undefined) {
          cleanData.burned = removeUndefined(existingData.burned);
        }
        
        // Merge food items if both exist
        if (correctedData.food?.items && existingData.food?.items) {
          cleanData.food = removeUndefined({
            date: targetDate,
            items: [
              ...(existingData.food.items || []),
              ...(correctedData.food.items || []),
            ],
          });
        } else if (correctedData.food) {
          cleanData.food = correctedData.food;
        } else if (existingData.food && existingData.food.items) {
          cleanData.food = removeUndefined(existingData.food);
        }
        
        console.log(`🔄 Merging ${currentDate} → ${targetDate} (target exists)`);
      } else {
        // No existing target document - just use the corrected data
        if (correctedData.weight) cleanData.weight = correctedData.weight;
        if (correctedData.burned) cleanData.burned = correctedData.burned;
        if (correctedData.food) cleanData.food = correctedData.food;
        
        console.log(`📦 Moving ${currentDate} → ${targetDate}`);
      }
      
      // Final cleanup - remove any undefined values from nested objects
      const finalData = removeUndefined(cleanData);
      
      // Save to target document
      await setDoc(toDocRef, finalData);
      
      // Delete source document (we've moved all data)
      if (currentDate !== targetDate) {
        await deleteDoc(fromDocRef);
        console.log(`✅ Migrated ${currentDate} → ${targetDate}`);
      }
    }
    
    console.log(`✨ Migration complete!`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

