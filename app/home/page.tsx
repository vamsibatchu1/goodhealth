"use client";

import { useState, useEffect } from "react";
import { DateTimeline } from "@/components/DateTimeline";
import { WeightCard } from "@/components/WeightCard";
import { CaloriesBurnedCard } from "@/components/CaloriesBurnedCard";
import { NutritionCard } from "@/components/NutritionCard";
import { DailyData, FoodItem } from "@/types";
import {
  saveWeight,
  saveCaloriesBurned,
  addFoodItem,
  subscribeToDailyData,
} from "@/lib/firebase/dailyData";
import { getTodayDateString } from "@/lib/date-utils";

// Helper to create empty daily data for a date
const createEmptyDailyData = (date: string): DailyData => ({
  date,
  weight: undefined,
  burned: undefined,
  food: undefined,
});

export default function HomePage() {
  const today = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(today);
  const [dailyData, setDailyData] = useState<DailyData>(createEmptyDailyData(today));
  const [isLoading, setIsLoading] = useState(true);

  // Reset to today's date on component mount to ensure we always start with today
  useEffect(() => {
    const todayDate = getTodayDateString();
    setSelectedDate(todayDate);
  }, []);

  // Subscribe to real-time updates for the selected date
  useEffect(() => {
    // Immediately clear ALL old data when date changes - use function form to ensure clean state
    setDailyData(() => createEmptyDailyData(selectedDate));
    setIsLoading(true);
    
    let isSubscribed = true;
    const currentDate = selectedDate; // Capture the date for this subscription
    
    const unsubscribe = subscribeToDailyData(selectedDate, (data) => {
      // Only update if this callback is still relevant (date hasn't changed)
      if (!isSubscribed) {
        return;
      }
      
      // Use functional update to ensure we're working with latest state
      setDailyData((prevData) => {
        // If the date has changed since we started this subscription, ignore this callback
        if (prevData.date !== currentDate) {
          return prevData;
        }
        
        if (data && data.date === currentDate) {
          return data;
        } else {
          // No data exists for this date - show empty state
          return createEmptyDailyData(currentDate);
        }
      });
      
      setIsLoading(false);
    });

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, [selectedDate]);

  const handleWeightUpdate = async (weight: number) => {
    try {
      await saveWeight(selectedDate, weight);
    } catch (error) {
      console.error("Error saving weight:", error);
      alert("Failed to save weight. Please try again.");
    }
  };

  const handleBurnedUpdate = async (burned: number) => {
    try {
      await saveCaloriesBurned(selectedDate, burned);
    } catch (error) {
      console.error("Error saving calories burned:", error);
      alert("Failed to save calories burned. Please try again.");
    }
  };

  const handleFoodAdd = async (item: FoodItem) => {
    try {
      await addFoodItem(selectedDate, item);
    } catch (error) {
      console.error("Error adding food item:", error);
      alert("Failed to add food item. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="pb-20">
        <DateTimeline
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <DateTimeline selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
        <WeightCard
          weight={dailyData.weight}
          date={selectedDate}
          onWeightUpdate={handleWeightUpdate}
        />
        <CaloriesBurnedCard
          burned={dailyData.burned}
          date={selectedDate}
          onBurnedUpdate={handleBurnedUpdate}
        />
        <NutritionCard
          food={dailyData.food}
          date={selectedDate}
          weight={dailyData.weight?.weight}
          onFoodAdd={handleFoodAdd}
        />
      </div>
    </div>
  );
}

