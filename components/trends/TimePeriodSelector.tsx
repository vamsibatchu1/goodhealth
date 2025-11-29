"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TimePeriod = "7days" | "month" | "3months";

interface TimePeriodSelectorProps {
  selected: TimePeriod;
  onSelect: (period: TimePeriod) => void;
}

export function TimePeriodSelector({
  selected,
  onSelect,
}: TimePeriodSelectorProps) {
  const periods: { id: TimePeriod; label: string }[] = [
    { id: "7days", label: "Last 7 Days" },
    { id: "month", label: "Last Month" },
    { id: "3months", label: "Last 3 Months" },
  ];

  return (
    <div className="flex gap-2 px-4 py-3">
      {periods.map((period) => (
        <Button
          key={period.id}
          onClick={() => onSelect(period.id)}
          variant={selected === period.id ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full flex-1",
            selected === period.id && "font-semibold"
          )}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
}

