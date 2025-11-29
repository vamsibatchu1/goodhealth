"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalorieBurnEntry } from "@/types";
import { AddCaloriesBurnedModal } from "./modals/AddCaloriesBurnedModal";

interface CaloriesBurnedCardProps {
  burned?: CalorieBurnEntry;
  date: string;
  onBurnedUpdate: (burned: number) => void;
}

export function CaloriesBurnedCard({
  burned,
  date,
  onBurnedUpdate,
}: CaloriesBurnedCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Calories Burned</CardTitle>
        </CardHeader>
        <CardContent>
          {burned ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">{burned.burned} kcal</div>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  size="sm"
                >
                  Update
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Total calories burned today
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-center py-4">
              <div className="space-y-2">
                <p className="text-base text-muted-foreground">
                  Every step counts! 🏃‍♀️
                </p>
                <p className="text-sm text-muted-foreground">
                  Track your workouts and daily activities to see how active you&apos;ve been.
                </p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full"
                size="lg"
              >
                Add Calories Burned
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AddCaloriesBurnedModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={(burnedValue) => {
          onBurnedUpdate(burnedValue);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

