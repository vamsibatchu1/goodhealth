"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTodayDateString, getDateString, isToday } from "@/lib/date-utils";

interface DateTimelineProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export function DateTimeline({ selectedDate, onDateSelect }: DateTimelineProps) {
  const [dates, setDates] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    // Generate last 14 days including today
    // Always regenerate dates on mount to ensure today is current
    const dateArray: string[] = [];
    const today = new Date();
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dateArray.push(getDateString(date));
    }
    
    setDates(dateArray);
  }, []);

  // Scroll to selected date when component loads or selectedDate changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    const selectedButton = buttonRefs.current.get(selectedDate);
    
    if (container && selectedButton) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        const containerWidth = container.clientWidth;
        const buttonLeft = selectedButton.offsetLeft;
        const buttonWidth = selectedButton.offsetWidth;
        const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        
        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      }, 100);
    }
  }, [selectedDate, dates]);

  const formatDateLabel = (dateStr: string): string => {
    const date = new Date(dateStr + "T00:00:00");
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = date.getDate();
    
    return isToday(dateStr) ? `Today ${dayNum}` : `${dayName} ${dayNum}`;
  };

  return (
    <div className="sticky top-0 z-10 bg-background border-b border-border pb-2 pt-4 px-4">
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
      >
        {dates.map((date) => {
          const isSelected = date === selectedDate;
          const isTodayDate = isToday(date);
          
          return (
            <Button
              key={date}
              ref={(el) => {
                if (el) {
                  buttonRefs.current.set(date, el);
                } else {
                  buttonRefs.current.delete(date);
                }
              }}
              onClick={() => onDateSelect(date)}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex-shrink-0 rounded-full px-4 py-2",
                isTodayDate && !isSelected && "border-primary/50 bg-primary/5"
              )}
            >
              {formatDateLabel(date)}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

