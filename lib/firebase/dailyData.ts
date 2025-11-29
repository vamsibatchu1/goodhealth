import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "./config";
import { DailyData, WeightEntry, CalorieBurnEntry, FoodEntry, FoodItem } from "@/types";

// For now, using a single user ID. Later you can add authentication
const USER_ID = "default-user";

const getDailyDataPath = (date: string) => {
  return `users/${USER_ID}/dailyData/${date}`;
};

/**
 * Save or update weight entry for a specific date
 */
export async function saveWeight(date: string, weight: number): Promise<void> {
  const docRef = doc(db, getDailyDataPath(date));
  const docSnap = await getDoc(docRef);
  
  const weightEntry: WeightEntry = {
    date,
    weight,
  };

  if (docSnap.exists()) {
    await updateDoc(docRef, { weight: weightEntry });
  } else {
    await setDoc(docRef, { weight: weightEntry, date });
  }
}

/**
 * Save or update calories burned entry for a specific date
 */
export async function saveCaloriesBurned(
  date: string,
  burned: number
): Promise<void> {
  const docRef = doc(db, getDailyDataPath(date));
  const docSnap = await getDoc(docRef);
  
  const burnedEntry: CalorieBurnEntry = {
    date,
    burned,
  };

  if (docSnap.exists()) {
    await updateDoc(docRef, { burned: burnedEntry });
  } else {
    await setDoc(docRef, { burned: burnedEntry, date });
  }
}

/**
 * Add a food item to a specific date
 */
export async function addFoodItem(date: string, item: FoodItem): Promise<void> {
  const docRef = doc(db, getDailyDataPath(date));
  const docSnap = await getDoc(docRef);
  
  let foodEntry: FoodEntry;
  
  if (docSnap.exists()) {
    const existingData = docSnap.data();
    const existingFood = existingData.food as FoodEntry | undefined;
    
    if (existingFood && existingFood.items) {
      foodEntry = {
        date,
        items: [...existingFood.items, item],
      };
    } else {
      foodEntry = {
        date,
        items: [item],
      };
    }
  } else {
    foodEntry = {
      date,
      items: [item],
    };
  }

  if (docSnap.exists()) {
    await updateDoc(docRef, { food: foodEntry });
  } else {
    await setDoc(docRef, { food: foodEntry, date });
  }
}

/**
 * Get daily data for a specific date
 */
export async function getDailyData(date: string): Promise<DailyData | null> {
  const docRef = doc(db, getDailyDataPath(date));
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  const data = docSnap.data();
  return {
    date,
    weight: data.weight as WeightEntry | undefined,
    burned: data.burned as CalorieBurnEntry | undefined,
    food: data.food as FoodEntry | undefined,
  };
}

/**
 * Subscribe to real-time updates for a specific date
 */
export function subscribeToDailyData(
  date: string,
  callback: (data: DailyData | null) => void
): Unsubscribe {
  const docRef = doc(db, getDailyDataPath(date));
  
  return onSnapshot(
    docRef,
    (docSnap) => {
      if (!docSnap.exists()) {
        callback(null);
        return;
      }
      
      const data = docSnap.data();
      const docDate = data.date as string | undefined;
      
      // Validate that the document is for the requested date
      if (docDate && docDate !== date) {
        callback(null);
        return;
      }
      
      callback({
        date,
        weight: data.weight as WeightEntry | undefined,
        burned: data.burned as CalorieBurnEntry | undefined,
        food: data.food as FoodEntry | undefined,
      });
    },
    (error) => {
      console.error("Error in daily data subscription:", error);
      callback(null);
    }
  );
}

/**
 * Get all daily data for a date range (useful for future features)
 */
export async function getDailyDataRange(
  startDate: string,
  endDate: string
): Promise<DailyData[]> {
  // This is a simplified version. For production, use query with where clauses
  const dates: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split("T")[0]);
  }
  
  const promises = dates.map((date) => getDailyData(date));
  const results = await Promise.all(promises);
  
  return results.filter((data): data is DailyData => data !== null);
}

