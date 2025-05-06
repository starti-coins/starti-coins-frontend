"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";

const WorldMap = dynamic(
  () => import("../components/world-map").then((mod) => mod.WorldMap),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export default function Home() {
  const [showMap, setShowMap] = useState<boolean>(true);

  return (
    <div className="p-4 lg:p-6 ">
      <Link href="/dashboard">
        <Button>Ir para o Dashboard</Button>
      </Link>

      <Button onClick={() => setShowMap((prev) => !prev)} className="mt-4">
        Show Map
      </Button>
      <div className="mt-12 max-w-[1000px] mx-auto">
        {showMap && (
          <WorldMap
            dots={[
              {
                start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
                end: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
              },
              {
                start: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
                end: { lat: 51.5074, lng: -0.1278, label: "London" },
              },
              {
                start: { lat: 51.5074, lng: -0.1278, label: "London" },
                end: { lat: 37.9838, lng: 23.7275, label: "Greece" },
              },
              {
                start: { lat: 37.9838, lng: 23.7275, label: "Greece" },
                end: { lat: 55.7558, lng: 37.6173, label: "Russia" },
              },
              {
                start: { lat: 55.7558, lng: 37.6173, label: "Russia" },
                end: { lat: -37.8136, lng: 144.9631, label: "Melbourne" },
              },
              {
                start: { lat: -37.8136, lng: 144.9631, label: "Melbourne" },
                end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}
