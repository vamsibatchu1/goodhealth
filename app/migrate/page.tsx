"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MigratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleMigrate = async () => {
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/migrate", {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        setMessage(result.message || "Migration completed successfully!");
      } else {
        setError(result.error || "Migration failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Migration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl pb-20">
      <Card>
        <CardHeader>
          <CardTitle>Fix Date Alignment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will move all data from date N to date N-1. For example, if
            November 29 has November 28&apos;s data, it will move it to November
            28.
          </p>
          <p className="text-sm font-medium text-yellow-600">
            ⚠️ This action cannot be undone. Make sure you have a backup of your
            data.
          </p>

          {message && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <Button
            onClick={handleMigrate}
            disabled={isLoading}
            className="w-full"
            variant="destructive"
          >
            {isLoading ? "Migrating..." : "Run Migration"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

