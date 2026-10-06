import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startedAt = performance.now()
    let frame = 0

    const update = (now) => {
      const elapsed = now - startedAt
      const next = Math.min(100, Math.round((elapsed / 5000) * 100))
      setProgress(next)
      if (next < 100) frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.7, delay: progress === 100 ? 0.15 : 0 }}
      className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-black ${
        progress === 100 ? 'pointer-events-none' : ''
      }`}
      aria-label="Memuat website"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,76,190,0.28),transparent_62%)]" />

      {/* Satu video petir full-screen tanpa audio. */}
      <video
        src="/petir.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-40"
      />

      <div className="relative z-10 w-[min(86vw,700px)] text-center">
        <p className="font-display text-2xl font-bold text-white sm:text-4xl">
          Welcome To My
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-accent-light text-glow sm:text-6xl">
          Portfolio Website
        </h1>

        <div className="mx-auto mt-7 w-[min(72vw,360px)]">
          <div className="mb-2 flex justify-between font-mono text-xs font-bold tracking-[0.18em] text-white/80">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/15 ring-1 ring-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent-light via-white to-accent shadow-[0_0_18px_rgba(91,140,255,0.95)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
