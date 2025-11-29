"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ProfileData {
  age: number;
  weight: number;
  height: number; // in cm
  targetWeight: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    age: 0,
    weight: 0,
    height: 0,
    targetWeight: 0,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<ProfileData>(profile);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [clearMessage, setClearMessage] = useState<string>("");

  useEffect(() => {
    // Load profile from localStorage or Firebase in the future
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setEditForm(JSON.parse(savedProfile));
    }
    setIsLoading(false);
  }, []);

  const calculateBMI = (weight: number, height: number): number => {
    if (height === 0) return 0;
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi === 0) return "Not set";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const handleSave = () => {
    setProfile(editForm);
    localStorage.setItem("userProfile", JSON.stringify(editForm));
    setIsEditModalOpen(false);
  };

  const handleClearAllData = async () => {
    setIsClearing(true);
    setClearMessage("");
    
    try {
      const response = await fetch("/api/clear-data", {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        setClearMessage("✅ All data cleared successfully! You can now start fresh.");
        setIsClearDialogOpen(false);
        // Refresh the page after 2 seconds to ensure UI is updated
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setClearMessage(`❌ Error: ${result.error || "Failed to clear data"}`);
      }
    } catch (err) {
      setClearMessage(`❌ Error: ${err instanceof Error ? err.message : "Failed to clear data"}`);
    } finally {
      setIsClearing(false);
    }
  };

  const bmi = calculateBMI(profile.weight, profile.height);

  if (isLoading) {
    return (
      <div className="pb-20">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profile Information</CardTitle>
            <Button
              onClick={() => {
                setEditForm(profile);
                setIsEditModalOpen(true);
              }}
              variant="outline"
              size="sm"
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Age</Label>
                <p className="text-lg font-semibold">
                  {profile.age || "Not set"}
                  {profile.age > 0 && " years"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Current Weight</Label>
                <p className="text-lg font-semibold">
                  {profile.weight || "Not set"}
                  {profile.weight > 0 && " kg"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Height</Label>
                <p className="text-lg font-semibold">
                  {profile.height || "Not set"}
                  {profile.height > 0 && " cm"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Target Weight</Label>
                <p className="text-lg font-semibold">
                  {profile.targetWeight || "Not set"}
                  {profile.targetWeight > 0 && " kg"}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <Label className="text-muted-foreground">BMI</Label>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{bmi || "—"}</p>
                {bmi > 0 && (
                  <span className="text-sm text-muted-foreground">
                    ({getBMICategory(bmi)})
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clear All Data Card */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="text-lg">Clear All Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This will permanently delete all your daily health data (weight, calories burned, and food entries).
              Your profile information will be kept. This action cannot be undone.
            </p>
            {clearMessage && (
              <div className={`rounded-md p-3 text-sm ${
                clearMessage.startsWith("✅")
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}>
                {clearMessage}
              </div>
            )}
            <Button
              onClick={() => setIsClearDialogOpen(true)}
              disabled={isClearing}
              variant="destructive"
              className="w-full"
            >
              {isClearing ? "Clearing data..." : "Clear All Data"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={editForm.age || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, age: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Current Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={editForm.weight || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    weight: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={editForm.height || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    height: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetWeight">Target Weight (kg)</Label>
              <Input
                id="targetWeight"
                type="number"
                step="0.1"
                value={editForm.targetWeight || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    targetWeight: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your daily health data including:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>All weight entries</li>
                <li>All calories burned entries</li>
                <li>All food and nutrition entries</li>
              </ul>
              <p className="mt-2 font-semibold">This action cannot be undone.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAllData}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Clear All Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

