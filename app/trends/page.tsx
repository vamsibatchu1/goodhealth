"use client";

import { useState, useEffect } from "react";
import { TimePeriodSelector } from "@/components/trends/TimePeriodSelector";
import { WeightTrendCard } from "@/components/trends/WeightTrendCard";
import { CaloriesBurnedTrendCard } from "@/components/trends/CaloriesBurnedTrendCard";
import { NutritionTrendCard } from "@/components/trends/NutritionTrendCard";
import { DailyData } from "@/types";
import { getDailyDataRange } from "@/lib/firebase/dailyData";

type TimePeriod = "7days" | "month" | "3months";

export default function TrendsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("7days");
  const [trendData, setTrendData] = useState<DailyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendData = async () => {
      setIsLoading(true);
      try {
        const today = new Date();
        let startDate: Date;

        switch (selectedPeriod) {
          case "7days":
            startDate = new Date(today);
            startDate.setDate(startDate.getDate() - 6);
            break;
          case "month":
            startDate = new Date(today);
            startDate.setMonth(startDate.getMonth() - 1);
            break;
          case "3months":
            startDate = new Date(today);
            startDate.setMonth(startDate.getMonth() - 3);
            break;
        }

        const startDateStr = startDate.toISOString().split("T")[0];
        const endDateStr = today.toISOString().split("T")[0];

        const data = await getDailyDataRange(startDateStr, endDateStr);
        setTrendData(data.sort((a, b) => a.date.localeCompare(b.date)));
      } catch (error) {
        console.error("Error fetching trend data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendData();
  }, [selectedPeriod]);

  if (isLoading) {
    return (
      <div className="pb-20">
        <TimePeriodSelector
          selected={selectedPeriod}
          onSelect={setSelectedPeriod}
        />
        <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading trends...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <TimePeriodSelector
        selected={selectedPeriod}
        onSelect={setSelectedPeriod}
      />
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
        <WeightTrendCard data={trendData} />
        <CaloriesBurnedTrendCard data={trendData} />
        <NutritionTrendCard data={trendData} />
      </div>
    </div>
  );
}

