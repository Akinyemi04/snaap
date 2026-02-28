"use client";

import { useEffect, useRef, useState } from "react";

interface LeafletMap {
  fitBounds: (
    bounds: [number, number][],
    options?: { padding?: [number, number] },
  ) => void;
  remove: () => void;
}

interface LeafletMarker {
  addTo: (map: LeafletMap) => LeafletMarker;
  bindTooltip: (
    content: string,
    options?: Record<string, string | number | boolean>,
  ) => LeafletMarker;
}

interface LeafletLike {
  map: (
    element: HTMLElement,
    options?: Record<string, string | number | boolean>,
  ) => LeafletMap;
  tileLayer: (
    url: string,
    options?: Record<string, string | number | boolean>,
  ) => { addTo: (map: LeafletMap) => void };
  circleMarker: (
    latlng: [number, number],
    options?: Record<string, string | number | boolean>,
  ) => LeafletMarker;
}

declare global {
  interface Window {
    L?: LeafletLike;
  }
}

const samplePeople = [
  {
    name: "Nina Patel",
    city: "Allen, Ikeja",
    lat: 6.6024,
    lng: 3.3515,
    color: "#4c6fff",
  },
  {
    name: "Luca Rossi",
    city: "Alausa, Ikeja",
    lat: 6.5943,
    lng: 3.3626,
    color: "#22c55e",
  },
  {
    name: "Maya Chen",
    city: "Oregun, Ikeja",
    lat: 6.6101,
    lng: 3.3656,
    color: "#ef4444",
  },
];

const loadLeaflet = (): Promise<LeafletLike> =>
  new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is unavailable"));
      return;
    }

    if (window.L) {
      resolve(window.L);
      return;
    }

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const onLoad = () => {
      if (window.L) {
        resolve(window.L);
      } else {
        reject(new Error("Leaflet failed to initialize"));
      }
    };

    const existingScript = document.getElementById(
      "leaflet-js",
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", onLoad, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Leaflet script")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = "leaflet-js";
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = onLoad;
    script.onerror = () => reject(new Error("Failed to load Leaflet script"));
    document.body.appendChild(script);
  });

export default function ActiveUsersMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let map: LeafletMap | null = null;
    let cancelled = false;

    const initializeMap = async () => {
      try {
        const L = await loadLeaflet();
        if (!mapRef.current || cancelled) {
          return;
        }

        map = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(map);

        const bounds: [number, number][] = [];

        samplePeople.forEach((person) => {
          L.circleMarker([person.lat, person.lng], {
            radius: 7,
            color: "#ffffff",
            fillColor: person.color,
            fillOpacity: 1,
            weight: 2,
          })
            .addTo(map as LeafletMap)
            .bindTooltip(`${person.name} - ${person.city}`, {
              direction: "top",
              offset: 8,
            });

          bounds.push([person.lat, person.lng]);
        });

        if (bounds.length > 0) {
          map.fitBounds(bounds, { padding: [26, 26] });
        }
      } catch {
        if (!cancelled) {
          setHasError(true);
        }
      }
    };

    initializeMap();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div className="relative z-0 h-52 overflow-hidden rounded-xl border border-[#e7e8ed] bg-[#f5f6fa]">
      <div ref={mapRef} className="h-full w-full" />
      {hasError ? (
        <div className="absolute inset-0 grid place-items-center text-center text-xs text-[#6b7280]">
          <p>Map failed to load.</p>
        </div>
      ) : null}
    </div>
  );
}

