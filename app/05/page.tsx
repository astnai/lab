"use client";

import { useEffect, useState, useCallback } from "react";
import NumberFlow from "@number-flow/react";

/**
 * Represents the location information structure
 */
interface Location {
  city: string;
  country: string;
  timezone: string;
  offset: string;
}

/**
 * Main clock component that displays current time and location
 */
export default function Page01() {
  // State management
  const [time, setTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [showLocation, setShowLocation] = useState(false);

  // Derived state
  const hours = time?.getHours() ?? 0;
  const minutes = time?.getMinutes() ?? 0;
  const seconds = time?.getSeconds() ?? 0;

  /**
   * Formats timezone offset to GMT format
   */
  const formatTimezoneOffset = useCallback((offset: number): string => {
    return `GMT${offset <= 0 ? "+" : "-"}${Math.abs(offset / 60)}`;
  }, []);

  /**
   * Extracts city name from timezone string
   */
  const extractCityFromTimezone = useCallback((timezone: string): string => {
    return timezone.split("/").pop()?.replace(/_/g, " ") || "";
  }, []);

  /**
   * Creates location data from timezone information
   */
  const createLocationFromTimezone = useCallback((): Location => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const formattedOffset = formatTimezoneOffset(offset);
    const cityFromTimezone = extractCityFromTimezone(timeZone);

    return {
      city: cityFromTimezone,
      country: "",
      timezone: timeZone,
      offset: formattedOffset,
    };
  }, [formatTimezoneOffset, extractCityFromTimezone]);

  /**
   * Fetches and sets location information
   */
  const fetchLocationInfo = useCallback(async () => {
    // Set initial location from timezone
    const timezoneLocation = createLocationFromTimezone();
    setLocation(timezoneLocation);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch("https://ipapi.co/json/", {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Only update if we got valid data
      if (data?.city || data?.country_code) {
        setLocation({
          city: data.city || timezoneLocation.city,
          country: data.country_code || "",
          timezone: timezoneLocation.timezone,
          offset: timezoneLocation.offset,
        });
      }
    } catch (error) {
      // Error is already handled by the initial timezone-based location
      console.debug("Location fetch failed, using timezone data:", error);
    }
  }, [createLocationFromTimezone]);

  // Initialize time and location
  useEffect(() => {
    fetchLocationInfo();

    const initialTimer = setTimeout(() => {
      setTime(new Date());
      setShowLocation(true);
    }, 1600);

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, [fetchLocationInfo]);

  return (
    <main className="flex items-center justify-center h-[calc(100vh-44px)]">
      <div className="flex flex-col items-center">
        {/* Time Display */}
        <div className="text-5xl sm:text-6xl font-medium font-mono tracking-tighter text-black dark:text-white">
          <NumberFlow value={hours} format={{ minimumIntegerDigits: 2 }} />
          <span>:</span>
          <NumberFlow value={minutes} format={{ minimumIntegerDigits: 2 }} />
          <span>:</span>
          <NumberFlow value={seconds} format={{ minimumIntegerDigits: 2 }} />
        </div>

        {/* Location Display */}
        <div className="h-2 sm:-mt-2">
          <div
            className={`text-base sm:text-xl text-neutral-500 font-lora transition-all duration-400 ease-in-out transform translate-y-0 ${
              showLocation ? "opacity-100" : "opacity-0"
            }`}
          >
            {location && (
              <>
                <span>{location.city}</span>
                {location.country && <span>, {location.country}</span>}
                <span className="ml-2">{location.offset}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
