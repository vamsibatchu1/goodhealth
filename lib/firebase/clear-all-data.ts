/**
 * Utility to clear all daily data from Firebase
 * This will delete all documents in the dailyData collection
 */

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

const USER_ID = "default-user";
const DAILY_DATA_COLLECTION = `users/${USER_ID}/dailyData`;

/**
 * Clear all daily data documents from Firebase
 */
export async function clearAllDailyData(): Promise<void> {
  try {
    console.log("🗑️ Starting data deletion...");
    
    const collectionRef = collection(db, DAILY_DATA_COLLECTION);
    const snapshot = await getDocs(collectionRef);
    
    console.log(`📋 Found ${snapshot.docs.length} documents to delete`);
    
    // Delete all documents
    const deletePromises = snapshot.docs.map((docSnap) => {
      console.log(`🗑️ Deleting document: ${docSnap.id}`);
      return deleteDoc(doc(db, `${DAILY_DATA_COLLECTION}/${docSnap.id}`));
    });
    
    await Promise.all(deletePromises);
    
    console.log(`✨ Deleted ${snapshot.docs.length} documents successfully!`);
  } catch (error) {
    console.error("❌ Failed to delete data:", error);
    throw error;
  }
}

