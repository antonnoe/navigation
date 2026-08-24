"use client";

import { useState } from "react";
import PreDrivePanel from "@/components/PreDrivePanel";
import NavigationMap from "@/components/NavigationMap";
import EmergencyButton from "@/components/EmergencyButton";

export default function Home() {
  const [destination, setDestination] = useState<string | null>(null);

  return (
    <main className="flex min-h-full flex-1 flex-col">
      {destination === null ? (
        <PreDrivePanel onStartNavigation={setDestination} />
      ) : (
        <NavigationMap destination={destination} />
      )}
      <EmergencyButton />
    </main>
  );
}
