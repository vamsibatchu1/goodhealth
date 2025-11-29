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
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationMessage, setMigrationMessage] = useState<string>("");

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

  const handleMigrateDates = async () => {
    if (!confirm("This will move all data backward by one day (e.g., Nov 29 data → Nov 28). This cannot be undone. Continue?")) {
      return;
    }

    setIsMigrating(true);
    setMigrationMessage("");
    
    try {
      const response = await fetch("/api/migrate", {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        setMigrationMessage("✅ Migration completed! Please refresh the page.");
      } else {
        setMigrationMessage(`❌ Error: ${result.error || "Migration failed"}`);
      }
    } catch (err) {
      setMigrationMessage(`❌ Error: ${err instanceof Error ? err.message : "Migration failed"}`);
    } finally {
      setIsMigrating(false);
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

        {/* Date Migration Card */}
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader>
            <CardTitle className="text-lg">Fix Date Alignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If your data is showing on the wrong dates (e.g., Nov 29 showing Nov 28&apos;s data), 
              click the button below to fix it. This will move all data backward by one day.
            </p>
            {migrationMessage && (
              <div className={`rounded-md p-3 text-sm ${
                migrationMessage.startsWith("✅")
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}>
                {migrationMessage}
              </div>
            )}
            <Button
              onClick={handleMigrateDates}
              disabled={isMigrating}
              variant="outline"
              className="w-full"
            >
              {isMigrating ? "Fixing dates..." : "Fix Date Alignment"}
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
    </div>
  );
}

