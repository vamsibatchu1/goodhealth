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

export default function Home() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [dailyData, setDailyData] = useState<DailyData>({ date: today });
  const [isLoading, setIsLoading] = useState(true);

  // Subscribe to real-time updates for the selected date
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToDailyData(selectedDate, (data) => {
      if (data) {
        setDailyData(data);
      } else {
        setDailyData({ date: selectedDate });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [selectedDate]);

  const handleWeightUpdate = async (weight: number) => {
    try {
      await saveWeight(selectedDate, weight);
      // Real-time update will handle the state update
    } catch (error) {
      console.error("Error saving weight:", error);
      alert("Failed to save weight. Please try again.");
    }
  };

  const handleBurnedUpdate = async (burned: number) => {
    try {
      await saveCaloriesBurned(selectedDate, burned);
      // Real-time update will handle the state update
    } catch (error) {
      console.error("Error saving calories burned:", error);
      alert("Failed to save calories burned. Please try again.");
    }
  };

  const handleFoodAdd = async (item: FoodItem) => {
    try {
      await addFoodItem(selectedDate, item);
      // Real-time update will handle the state update
    } catch (error) {
      console.error("Error adding food item:", error);
      alert("Failed to add food item. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <DateTimeline
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <DateTimeline
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
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
    </main>
  );
}

