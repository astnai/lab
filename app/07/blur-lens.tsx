"use client"


import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BlurLensProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  blurSize?: number
  blurStrength?: number
  initialPosition?: { x: number; y: number }
  rounded?: string
  className?: string
}

export default function BlurLens({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  blurSize = 100,
  blurStrength = 5,
  initialPosition,
  rounded = "rounded-xl",
  className,
}: BlurLensProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 })

  // Update container dimensions and initial position
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const newWidth = fill ? rect.width : width || rect.width
      const newHeight = fill ? rect.height : height || rect.height

      setContainerDimensions({ width: newWidth, height: newHeight })

      if (!initialPosition) {
        setPosition({
          x: Math.max(0, newWidth / 2 - blurSize / 2),
          y: Math.max(0, newHeight / 2 - blurSize / 2),
        })
      }
    }
  }, [width, height, fill, blurSize, initialPosition])

  // Handle mouse/touch movement with better mobile support
  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current || !isDragging) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left - blurSize / 2
    const y = clientY - rect.top - blurSize / 2

    // Use current container dimensions for constraints
    const maxX = Math.max(0, containerDimensions.width - blurSize)
    const maxY = Math.max(0, containerDimensions.height - blurSize)

    const constrainedX = Math.max(0, Math.min(maxX, x))
    const constrainedY = Math.max(0, Math.min(maxY, y))

    setPosition({ x: constrainedX, y: constrainedY })
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)

  // Touch event handlers with better mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleTouchEnd = () => setIsDragging(false)

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  // Set up and clean up event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove, { passive: false })
      window.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, containerDimensions])

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && fill) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerDimensions({ width: rect.width, height: rect.height })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [fill])

  const containerStyle = fill ? { position: "relative" as const, width: "100%", height: "100%" } : { width, height }

  return (
    <div
      ref={containerRef}
      className={cn("relative select-none touch-none overflow-hidden", rounded, className)}
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        className={cn("pointer-events-none", rounded)}
        priority
      />
      <div
        className={cn(
          "absolute border border-white/20 cursor-move transition-transform duration-60 ease-out",
          rounded,
          isDragging && "scale-105",
        )}
        style={{
          width: blurSize,
          height: blurSize,
          left: position.x,
          top: position.y,
          backdropFilter: `blur(${blurStrength}px)`,
          WebkitBackdropFilter: `blur(${blurStrength}px)`,
          touchAction: "none",
        }}
        aria-label="Movable blur lens"
        role="slider"
        tabIndex={0}
        onKeyDown={(e) => {
          const step = 10
          let newX = position.x
          let newY = position.y

          switch (e.key) {
            case "ArrowLeft":
              newX = Math.max(0, position.x - step)
              break
            case "ArrowRight":
              newX = Math.min(containerDimensions.width - blurSize, position.x + step)
              break
            case "ArrowUp":
              newY = Math.max(0, position.y - step)
              break
            case "ArrowDown":
              newY = Math.min(containerDimensions.height - blurSize, position.y + step)
              break
            default:
              return
          }

          e.preventDefault()
          setPosition({ x: newX, y: newY })
        }}
      />
    </div>
  )
}
