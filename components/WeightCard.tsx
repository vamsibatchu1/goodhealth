"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeightEntry } from "@/types";
import { AddWeightModal } from "./modals/AddWeightModal";

interface WeightCardProps {
  weight?: WeightEntry;
  date: string;
  onWeightUpdate: (weight: number) => void;
}

export function WeightCard({ weight, date, onWeightUpdate }: WeightCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Weight</CardTitle>
        </CardHeader>
        <CardContent>
          {weight ? (
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">{weight.weight} kg</div>
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                size="sm"
              >
                Update Weight
              </Button>
            </div>
          ) : (
            <div className="space-y-4 text-center py-4">
              <div className="space-y-2">
                <p className="text-base text-muted-foreground">
                  Track your progress every day!
                </p>
                <p className="text-sm text-muted-foreground">
                  Recording your weight helps you stay motivated and see your journey.
                </p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full"
                size="lg"
              >
                Add Weight
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AddWeightModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={(weightValue) => {
          onWeightUpdate(weightValue);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

