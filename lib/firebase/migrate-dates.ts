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
      const correctedData: any = {
        date: targetDate,
      };
      
      if (docInfo.data.weight) {
        correctedData.weight = {
          ...docInfo.data.weight,
          date: targetDate,
        };
      }
      
      if (docInfo.data.burned) {
        correctedData.burned = {
          ...docInfo.data.burned,
          date: targetDate,
        };
      }
      
      if (docInfo.data.food) {
        correctedData.food = {
          ...docInfo.data.food,
          date: targetDate,
        };
      }
      
      // Check if target document already exists
      const targetDoc = documents.find((d) => d.id === targetDate);
      
      if (targetDoc && targetDoc.data) {
        // Merge with existing data - prefer the data we're moving (it's more recent)
        const existingData = targetDoc.data;
        
        correctedData.weight = correctedData.weight || existingData.weight;
        correctedData.burned = correctedData.burned || existingData.burned;
        
        // Merge food items if both exist
        if (correctedData.food?.items && existingData.food?.items) {
          correctedData.food = {
            date: targetDate,
            items: [
              ...(existingData.food.items || []),
              ...(correctedData.food.items || []),
            ],
          };
        } else {
          correctedData.food = correctedData.food || existingData.food;
        }
        
        console.log(`🔄 Merging ${currentDate} → ${targetDate} (target exists)`);
      } else {
        console.log(`📦 Moving ${currentDate} → ${targetDate}`);
      }
      
      // Save to target document
      await setDoc(toDocRef, correctedData);
      
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

