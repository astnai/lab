"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

// --------------------------------
// Types and Interfaces
// --------------------------------
interface Fish {
  id: number;
  x: number;
  y: number;
  speed: number;
  direction: number;
  size: number;
  verticalMovement: number;
  fishType: string;
}

interface FishConfig {
  COUNT: number;
  SPEED: { MIN: number; MAX: number };
  SIZE: { MIN: number; MAX: number };
  TYPES: Array<{ type: string; count: number }>;
  BOUNDS: {
    VERTICAL: { MIN: number; MAX: number };
    HORIZONTAL: { MIN: number; MAX: number };
  };
  MOVEMENT: {
    FACTOR: number;
    VERTICAL_RANDOMNESS: { MIN: number; MAX: number };
  };
}

const FISH_CONFIG: FishConfig = {
  COUNT: 9,
  SPEED: { MIN: 0.5, MAX: 2.5 },
  SIZE: { MIN: 0.8, MAX: 1.4 },
  TYPES: [
    { type: "🐟", count: 3 },
    { type: "🐠", count: 3 },
    { type: "🐡", count: 2 },
  ],
  BOUNDS: {
    VERTICAL: { MIN: 10, MAX: 90 },
    HORIZONTAL: { MIN: 5, MAX: 90 },
  },
  MOVEMENT: {
    FACTOR: 10,
    VERTICAL_RANDOMNESS: { MIN: 0.02, MAX: 0.1 },
  },
};

const getRandomValue = (min: number, max: number): number =>
  min + Math.random() * (max - min);

const generateFish = (): Fish[] => {
  const fishTypes: string[] = FISH_CONFIG.TYPES.flatMap(({ type, count }) =>
    Array(count).fill(type)
  );

  return Array.from({ length: FISH_CONFIG.COUNT }, (_, i) => ({
    id: i,
    x: getRandomValue(0, 100),
    y: getRandomValue(20, 70),
    speed: getRandomValue(FISH_CONFIG.SPEED.MIN, FISH_CONFIG.SPEED.MAX),
    direction: Math.random() > 0.5 ? 1 : -1,
    size: getRandomValue(FISH_CONFIG.SIZE.MIN, FISH_CONFIG.SIZE.MAX),
    verticalMovement: getRandomValue(
      FISH_CONFIG.MOVEMENT.VERTICAL_RANDOMNESS.MIN,
      FISH_CONFIG.MOVEMENT.VERTICAL_RANDOMNESS.MAX
    ),
    fishType: fishTypes[i],
  }));
};

export default function AquariumCard() {
  // State and refs
  const [fishes, setFishes] = useState<Fish[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const fishesRef = useRef<Fish[]>([]);
  const fishElementsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const lastUpdateTimeRef = useRef<number>(0);
  const updateFishPositions = useCallback((timestamp: number) => {
    const deltaTime = lastUpdateTimeRef.current
      ? (timestamp - lastUpdateTimeRef.current) / 16.67
      : 1;
    lastUpdateTimeRef.current = timestamp;

    fishesRef.current = fishesRef.current.map((fish) => {
      const speedFactor = fish.speed * deltaTime;
      let newX =
        fish.x + (speedFactor * fish.direction) / FISH_CONFIG.MOVEMENT.FACTOR;
      let newDirection = fish.direction;

      // Handle horizontal boundaries
      const sizeOffset = fish.size * (fish.direction === 1 ? 4 : 0);
      const { MIN, MAX } = FISH_CONFIG.BOUNDS.HORIZONTAL;

      if (newX > MAX - sizeOffset) {
        newDirection = -1;
        newX = MAX - sizeOffset;
      } else if (newX < MIN) {
        newDirection = 1;
        newX = MIN;
      }

      // Add individualized vertical movement with boundaries
      const verticalChange =
        (Math.random() - 0.5) * fish.verticalMovement * deltaTime;
      let newY = fish.y + verticalChange;

      // Handle vertical boundaries
      const { MIN: VMIN, MAX: VMAX } = FISH_CONFIG.BOUNDS.VERTICAL;
      newY = Math.max(VMIN, Math.min(VMAX, newY));

      // Update DOM directly for smooth animation
      const fishElement = fishElementsRef.current.get(fish.id);
      if (fishElement) {
        const transform = `translate3d(0,0,0) scale(${fish.size}) scaleX(${
          newDirection * -1
        })`;
        fishElement.style.transform = transform;
        fishElement.style.left = `${newX}%`;
        fishElement.style.top = `${newY}%`;
      }

      return { ...fish, x: newX, y: newY, direction: newDirection };
    });

    return fishesRef.current;
  }, []);

  // Animation loop using requestAnimationFrame
  const animateFish = useCallback(
    (timestamp: number) => {
      updateFishPositions(timestamp);
      animationRef.current = requestAnimationFrame(animateFish);
    },
    [updateFishPositions]
  );

  // Initialize fish and start animation
  useEffect(() => {
    const initialFish = generateFish();
    setFishes(initialFish);
    fishesRef.current = initialFish;

    setTimeout(() => {
      lastUpdateTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animateFish);
    }, 50);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateFish]);

  // Ref callback to store references to fish elements
  const setFishElementRef = useCallback(
    (element: HTMLDivElement | null, fishId: number) => {
      if (element) {
        fishElementsRef.current.set(fishId, element);
      }
    },
    []
  );

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="p-1.5 max-w-md w-full mx-6 rounded-2xl bg-gradient-to-t from-blue-300 to-white">
        <div className="w-full max-w-md h-40 md:h-60 rounded-xl shadow-sm overflow-hidden relative border-0 dark:bg-transparent bg-transparent">
          {/* Border gradient overlay */}
          <div className="absolute -inset-1 bg-gradient-to-t from-blue-400 to-white rounded-xl z-0"></div>

          {/* Content container */}
          <div className="absolute inset-0.5 rounded-xl overflow-hidden z-10 opacity-80">
            {/* Water Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-30"></div>

            {/* Light Effects */}
            <div className="absolute top-0 left-1/4 w-20 h-32 bg-gradient-to-b from-white to-transparent opacity-10 blur-md transform -rotate-12"></div>
            <div className="absolute top-0 right-1/4 w-16 h-24 bg-gradient-to-b from-white to-transparent opacity-10 blur-md transform rotate-12"></div>
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-blue-200 to-transparent opacity-40"></div>

            {/* Fish */}
            {fishes.map((fish) => (
              <div
                key={fish.id}
                ref={(el) => setFishElementRef(el, fish.id)}
                className="absolute will-change-transform"
                style={{
                  left: `${fish.x}%`,
                  top: `${fish.y}%`,
                  transform: `translate3d(0,0,0) scale(${fish.size}) scaleX(${
                    fish.direction * -1
                  })`,
                }}
              >
                <div className="fish text-3xl md:text-4xl">{fish.fishType}</div>
              </div>
            ))}

            {/* Decorations */}
            <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2">
              <div className="text-5xl md:text-6xl">🌿</div>
            </div>
            <div className="absolute bottom-0 right-1/4 transform translate-x-1/2">
              <div className="text-5xl md:text-6xl">
                🌿
                <span className="text-6xl md:text-7xl">🗿</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
