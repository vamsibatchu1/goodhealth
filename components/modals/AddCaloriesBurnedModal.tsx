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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddCaloriesBurnedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (burned: number) => void;
}

export function AddCaloriesBurnedModal({
  open,
  onOpenChange,
  onSave,
}: AddCaloriesBurnedModalProps) {
  const [burned, setBurned] = useState("");

  const handleSave = () => {
    const burnedValue = parseInt(burned);
    if (!isNaN(burnedValue) && burnedValue >= 0) {
      onSave(burnedValue);
      setBurned("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Calories Burned</DialogTitle>
          <DialogDescription>
            Enter the total calories you burned today (kcal).
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="burned">Calories Burned (kcal)</Label>
            <Input
              id="burned"
              type="number"
              placeholder="480"
              value={burned}
              onChange={(e) => setBurned(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

