"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FoodEntry, NutritionSummary } from "@/types";
import { AddFoodModal } from "./modals/AddFoodModal";
import {
  getNutritionTargets,
  getProgressColor,
  getProgressBgColor,
} from "@/lib/nutrition-targets";

interface NutritionCardProps {
  food?: FoodEntry;
  date: string;
  weight?: number;
  onFoodAdd: (item: any) => void;
}

export function NutritionCard({
  food,
  date,
  weight,
  onFoodAdd,
}: NutritionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const targets = getNutritionTargets(weight);
  const summary: NutritionSummary = food
    ? food.items.reduce(
        (acc, item) => ({
          calories: acc.calories + item.calories,
          protein: acc.protein + item.protein,
          carbs: acc.carbs + item.carbs,
          fats: acc.fats + item.fats,
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 }
      )
    : { calories: 0, protein: 0, carbs: 0, fats: 0 };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Calorie Intake & Nutrition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary Row */}
          <div className="space-y-3">
            <div className="text-sm font-medium">Daily Summary</div>
            <div className="space-y-2">
              {/* Calories */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Calories</span>
                  <span className={getProgressColor(summary.calories, targets.calories)}>
                    {summary.calories} / {targets.calories}
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressBgColor(summary.calories, targets.calories)}`}
                    style={{
                      width: `${getProgressPercentage(summary.calories, targets.calories)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Protein */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Protein</span>
                  <span className={getProgressColor(summary.protein, targets.protein)}>
                    {summary.protein}g / {targets.protein}g
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressBgColor(summary.protein, targets.protein)}`}
                    style={{
                      width: `${getProgressPercentage(summary.protein, targets.protein)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Carbs */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Carbs</span>
                  <span className={getProgressColor(summary.carbs, targets.carbs)}>
                    {summary.carbs}g / {targets.carbs}g
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressBgColor(summary.carbs, targets.carbs)}`}
                    style={{
                      width: `${getProgressPercentage(summary.carbs, targets.carbs)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Fats */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fats</span>
                  <span className={getProgressColor(summary.fats, targets.fats)}>
                    {summary.fats}g / {targets.fats}g
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressBgColor(summary.fats, targets.fats)}`}
                    style={{
                      width: `${getProgressPercentage(summary.fats, targets.fats)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add Food Button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full"
            size="lg"
          >
            Add Food Entry
          </Button>

          {/* Food List */}
          <div className="space-y-3">
            <div className="text-sm font-medium">Food Entries</div>
            {food && food.items.length > 0 ? (
              <div className="space-y-3">
                {food.items.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 bg-muted/30"
                  >
                    <div className="font-medium mb-1">
                      {item.name}
                      {item.weight && (
                        <span className="text-muted-foreground ml-1">
                          ({item.weight})
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-primary mb-1">
                      Calories: {item.calories} kcal
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Protein: {item.protein}g • Carbs: {item.carbs}g • Fats:{" "}
                      {item.fats}g
                      {item.fiber > 0 && ` • Fiber: ${item.fiber}g`}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 space-y-3 border border-dashed rounded-lg bg-muted/20">
                <p className="text-base text-muted-foreground">
                  Start tracking your nutrition! 🥗
                </p>
                <p className="text-sm text-muted-foreground px-4">
                  Log your meals to see how you're doing with your daily goals.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddFoodModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={(item) => {
          onFoodAdd(item);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

