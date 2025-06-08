"use client";

import Image from "next/image";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

//demo_key? :O
const NASA_API_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

// Constants for loading and error states
const LOADING_MESSAGE = "Loading cosmic wonders...";
const ERROR_MESSAGE = "An error occurred while fetching the image";

interface APODData {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl: string;
  copyright?: string;
}

export default function Page04() {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await fetch(NASA_API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch APOD data: ${response.status}`);
        }
        const data = await response.json();
        setApodData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : ERROR_MESSAGE);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAPOD();
  }, []);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        role="status"
        aria-label="Loading"
      >
        <div className="animate-pulse text-neutral-500">{LOADING_MESSAGE}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        role="alert"
        aria-label="Error"
      >
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!apodData) return null;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen p-8 mt-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-xl sm:text-2xl font-medium font-lora">
            {apodData.title}
          </h2>
          <a
            href={apodData.hdurl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 pt-1 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            aria-label="View high resolution image"
          >
            <ExternalLinkIcon className="w-5 h-5" />
          </a>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-2">
          <Image
            src={apodData.url}
            alt={apodData.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="space-y-4">
          <p className="text-sm sm:text-base text-neutral-500 text-balance">
            This image is from the Astronomy Picture of the Day, today&apos;s
            image is from {formatDate(apodData.date)}
          </p>

          <h3 className="text-xl font-medium font-lora">Image description</h3>

          <p className="text-neutral-500 leading-relaxed">
            {apodData.explanation}
          </p>

          {apodData.copyright && (
            <p className="text-sm sm:text-base text-neutral-500">
              Credit: {apodData.copyright}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
