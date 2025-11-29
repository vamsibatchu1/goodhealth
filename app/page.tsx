"use client";

import { useState } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { HomePage } from "./home/page";
import { TrendsPage } from "./trends/page";
import { ProfilePage } from "./profile/page";

type TabType = "home" | "trends" | "profile";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "trends":
        return <TrendsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {renderPage()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}

