"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getNutritionFromLLM } from "@/lib/nutrition-api";
import { FoodItem } from "@/types";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddFoodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: FoodItem) => void;
}

type TabType = "llm" | "manual";

export function AddFoodModal({
  open,
  onOpenChange,
  onSave,
}: AddFoodModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("llm");
  
  // LLM tab state
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewItem, setPreviewItem] = useState<FoodItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Manual tab state
  const [manualItem, setManualItem] = useState({
    name: "",
    weight: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    fiber: "",
  });

  const handleLLMSubmit = async () => {
    if (!description.trim()) {
      setError("Please enter a food description");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPreviewItem(null);

    try {
      const nutritionData = await getNutritionFromLLM(description);
      setPreviewItem(nutritionData);
    } catch (err) {
      setError("Failed to analyze food entry. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToDay = () => {
    if (activeTab === "llm" && previewItem) {
      onSave(previewItem);
      handleClose();
    } else if (activeTab === "manual") {
      // Validate manual entry
      if (!manualItem.name.trim()) {
        setError("Food name is required");
        return;
      }
      if (!manualItem.calories || parseFloat(manualItem.calories) <= 0) {
        setError("Please enter a valid calorie amount");
        return;
      }

      const foodItem: FoodItem = {
        name: manualItem.name.trim(),
        calories: parseFloat(manualItem.calories) || 0,
        protein: parseFloat(manualItem.protein) || 0,
        carbs: parseFloat(manualItem.carbs) || 0,
        fats: parseFloat(manualItem.fats) || 0,
        fiber: parseFloat(manualItem.fiber) || 0,
      };

      if (manualItem.weight.trim()) {
        foodItem.weight = manualItem.weight.trim();
      }

      onSave(foodItem);
      handleClose();
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setDescription("");
    setPreviewItem(null);
    setError(null);
    setIsLoading(false);
    setActiveTab("llm");
    setManualItem({
      name: "",
      weight: "",
      calories: "",
      protein: "",
      carbs: "",
      fats: "",
      fiber: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Food Entry</DialogTitle>
          <DialogDescription>
            {activeTab === "llm"
              ? "Describe what you ate. This text will be sent to an LLM to calculate nutrition values."
              : "Enter the nutrition information manually."}
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 border-b">
          <button
            type="button"
            onClick={() => {
              setActiveTab("llm");
              setError(null);
            }}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "llm"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            LLM Analysis
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("manual");
              setError(null);
            }}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === "manual"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Manual Entry
          </button>
        </div>

        <div className="space-y-4 py-4">
          {activeTab === "llm" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="food-description">Food Description</Label>
                <Textarea
                  id="food-description"
                  placeholder="e.g., 100g rajma with 120g cooked rice and 1 roti"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Example: "McDonald's McChicken + small fries" or "100g rajma
                  with 120g cooked rice"
                </p>
              </div>

              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm">Analyzing food entry...</span>
                </div>
              )}

              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {previewItem && !isLoading && (
                <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                  <div className="font-medium">{previewItem.name}</div>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="font-semibold">Calories:</span>{" "}
                      {previewItem.calories} kcal
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Protein: {previewItem.protein}g • Carbs:{" "}
                      {previewItem.carbs}g • Fats: {previewItem.fats}g
                      {previewItem.fiber > 0 &&
                        ` • Fiber: ${previewItem.fiber}g`}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="manual-name">Food Name *</Label>
                <Input
                  id="manual-name"
                  placeholder="e.g., Rajma with Rice"
                  value={manualItem.name}
                  onChange={(e) =>
                    setManualItem({ ...manualItem, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manual-weight">Weight (optional)</Label>
                <Input
                  id="manual-weight"
                  placeholder="e.g., 220g"
                  value={manualItem.weight}
                  onChange={(e) =>
                    setManualItem({ ...manualItem, weight: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manual-calories">Calories (kcal) *</Label>
                  <Input
                    id="manual-calories"
                    type="number"
                    placeholder="350"
                    value={manualItem.calories}
                    onChange={(e) =>
                      setManualItem({
                        ...manualItem,
                        calories: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manual-protein">Protein (g)</Label>
                  <Input
                    id="manual-protein"
                    type="number"
                    placeholder="14"
                    value={manualItem.protein}
                    onChange={(e) =>
                      setManualItem({
                        ...manualItem,
                        protein: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manual-carbs">Carbs (g)</Label>
                  <Input
                    id="manual-carbs"
                    type="number"
                    placeholder="60"
                    value={manualItem.carbs}
                    onChange={(e) =>
                      setManualItem({
                        ...manualItem,
                        carbs: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manual-fats">Fats (g)</Label>
                  <Input
                    id="manual-fats"
                    type="number"
                    placeholder="3"
                    value={manualItem.fats}
                    onChange={(e) =>
                      setManualItem({
                        ...manualItem,
                        fats: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manual-fiber">Fiber (g)</Label>
                <Input
                  id="manual-fiber"
                  type="number"
                  placeholder="7"
                  value={manualItem.fiber}
                  onChange={(e) =>
                    setManualItem({
                      ...manualItem,
                      fiber: e.target.value,
                    })
                  }
                />
              </div>

              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          {activeTab === "llm" ? (
            previewItem ? (
              <Button onClick={handleAddToDay}>Add to Day</Button>
            ) : (
              <Button
                onClick={handleLLMSubmit}
                disabled={isLoading || !description.trim()}
              >
                Submit
              </Button>
            )
          ) : (
            <Button
              onClick={handleAddToDay}
              disabled={!manualItem.name.trim() || !manualItem.calories}
            >
              Add to Day
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

