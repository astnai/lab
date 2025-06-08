"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// Types
type ArtworkMetadata = {
  title: string;
  year: string;
  artist: string;
  artistYears: string;
  museum: string;
  location: string;
};

// Constants
const TITLE_ROTATION_INTERVAL = 2000; // 2.5 seconds
const TITLE_TRANSITION_DURATION = 400; // 0.4 seconds

const ARTWORK_TITLES = [
  "The Great Wave off Kanagawa",
  "Kanagawa-oki Nami Ura",
  "神奈川沖浪裏",
] as const;

const ARTWORK_METADATA: Omit<ArtworkMetadata, "title"> = {
  year: "1831",
  artist: "Katsushika Hokusai",
  artistYears: "1760-1849",
  museum: "Metropolitan Museum of Art",
  location: "1000 5th Ave, New York, NY 10028, USA",
};

// Components
const ArtworkCaption = ({
  title,
  year,
  artist,
  artistYears,
  museum,
  location,
  isTransitioning,
}: ArtworkMetadata & { isTransitioning: boolean }) => (
  <footer className="absolute -bottom-0 right-0 transform translate-y-full text-right flex flex-col items-end text-[10px] md:text-sm text-neutral-800 dark:text-neutral-200 pt-2 pr-1 italic">
    <p>
      <span
        className={`transition-opacity duration-[${TITLE_TRANSITION_DURATION}ms] ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {title}
      </span>
      <span> ({year})</span>
    </p>
    <p>{`${artist} (${artistYears})`}</p>
    <p>{museum}</p>
    <p>{location}</p>
  </footer>
);

export default function Page02() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentMetadata: ArtworkMetadata = {
    ...ARTWORK_METADATA,
    title: ARTWORK_TITLES[currentTitleIndex],
  };

  useEffect(() => {
    const titleRotationInterval = setInterval(() => {
      setIsTransitioning(true);

      const titleChangeTimeout = setTimeout(() => {
        setCurrentTitleIndex(
          (prevIndex) => (prevIndex + 1) % ARTWORK_TITLES.length
        );
        setIsTransitioning(false);
      }, TITLE_TRANSITION_DURATION);

      return () => clearTimeout(titleChangeTimeout);
    }, TITLE_ROTATION_INTERVAL);

    return () => clearInterval(titleRotationInterval);
  }, []);

  return (
    <main className="relative w-full h-screen flex items-center justify-center">
      <section className="relative w-[90%] sm:w-[80%] md:w-[70%] lg:w-1/3 aspect-[3/2]">
        <div className="w-full h-full relative">
          <Image
            src="/great-wave.webp"
            alt={`${currentMetadata.title} by ${currentMetadata.artist}`}
            width={1071}
            height={720}
            priority
            className="object-contain"
          />
        </div>

        <ArtworkCaption
          {...currentMetadata}
          isTransitioning={isTransitioning}
        />
      </section>
    </main>
  );
}
