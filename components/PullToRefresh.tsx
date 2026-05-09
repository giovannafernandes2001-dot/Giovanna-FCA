'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCw } from 'lucide-react'

const THRESHOLD = 72

export default function PullToRefresh({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [pullY, setPullY] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef(0)
  const active = useRef(false)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      active.current = true
    }
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!active.current) return
    const delta = e.touches[0].clientY - startY.current
    if (delta > 0) setPullY(Math.min(delta * 0.5, THRESHOLD + 16))
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!active.current) return
    active.current = false
    if (pullY >= THRESHOLD) {
      setRefreshing(true)
      setPullY(0)
      router.refresh()
      setTimeout(() => setRefreshing(false), 1200)
    } else {
      setPullY(0)
    }
  }, [pullY, router])

  const progress = Math.min(pullY / THRESHOLD, 1)
  const visible = pullY > 4 || refreshing

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div
        className="flex items-center justify-center overflow-hidden transition-all duration-300"
        style={{ height: refreshing ? 48 : pullY > 0 ? pullY : 0 }}
      >
        {visible && (
          <RefreshCw
            size={22}
            className={`text-brand-blue transition-opacity ${refreshing ? 'animate-spin opacity-100' : 'opacity-70'}`}
            style={!refreshing ? { transform: `rotate(${progress * 270}deg)` } : undefined}
          />
        )}
      </div>
      {children}
    </div>
  )
}
