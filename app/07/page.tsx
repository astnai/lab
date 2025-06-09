"use client"

import { useState } from "react"
import BlurLens from "./blur-lens"

export default function Home() {
  const [blurSize, setBlurSize] = useState(120)
  const [blurStrength, setBlurStrength] = useState(8)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-4 sm:gap-8">
      <div className="w-full max-w-[800px] aspect-[800/433]">
        <BlurLens
          src="/golden-bridge.webp"
          alt="Golden Gate Bridge demonstration"
          fill
          blurSize={blurSize}
          blurStrength={blurStrength}
          rounded="rounded-2xl"
          className="shadow-lg"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-8 sm:gap-32 items-center justify-center w-full max-w-[800px]">
        <div className="flex flex-col items-center gap-1 w-full sm:w-auto">
          <label htmlFor="blur-size" className="text-sm text-neutral-800 dark:text-neutral-200">
            Blur Size
          </label>
          <input
            id="blur-size"
            type="range"
            min="40"
            max="200"
            value={blurSize}
            onChange={(e) => setBlurSize(Number(e.target.value))}
            className="w-full sm:w-32"
          />
          <span className="text-sm text-neutral-500 dark:text-neutral-400">{blurSize}px</span>
        </div>

        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
          <label htmlFor="blur-strength" className="text-sm text-neutral-800 dark:text-neutral-200">
            Blur Strength
          </label>
          <input
            id="blur-strength"
            type="range"
            min="1"
            max="20"
            value={blurStrength}
            onChange={(e) => setBlurStrength(Number(e.target.value))}
            className="w-full sm:w-32"
          />
          <span className="text-sm text-neutral-500 dark:text-neutral-400">{blurStrength}px</span>
        </div>
      </div>
    </main>
  )
}
