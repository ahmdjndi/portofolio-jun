import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { dailyRotation, profile, socials } from '../data/profile'
import SocialIcon from './SocialIcon'
import Typewriter from './Typewriter'

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
}

/* ================= Equalizer animasi ================= */
function Equalizer({ playing, tone = 'bg-accent-light' }) {
  return (
    <span className="flex h-3 items-end gap-[2px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={`w-[2px] rounded-full ${tone}`}
          animate={
            playing
              ? { height: ['25%', '100%', '45%', '85%', '30%'] }
              : { height: '22%' }
          }
          transition={
            playing
              ? { duration: 0.9 + i * 0.18, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
          style={{ height: '22%' }}
        />
      ))}
    </span>
  )
}

/* ================= Kartu Daily Rotation ================= */
/* ================= Kartu Daily Rotation (gaya Spotify) ================= */
function DailyRotation() {
  const [playing, setPlaying] = useState(false)
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)
  const playingRef = useRef(false)
  const track = dailyRotation.tracks[index]

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onLoadedMetadata = () => setDuration(audio.duration || 0)
    const onEnded = () => {
      setIndex((current) => (current + 1) % dailyRotation.tracks.length)
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.pause()
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = track.audio
    audio.load()
    setProgress(0)
    setDuration(0)
    if (playingRef.current) audio.play().catch(() => setPlaying(false))
  }, [index, track.audio])

  const togglePlaying = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  const skip = (dir) => {
    const audio = audioRef.current
    const shouldPlay = playing
    if (dir < 0 && audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    if (audio) audio.pause()
    playingRef.current = shouldPlay
    setPlaying(shouldPlay)
    setIndex((i) => (i + dir + dailyRotation.tracks.length) % dailyRotation.tracks.length)
  }

  const selectTrack = (nextIndex) => {
    if (audioRef.current) audioRef.current.pause()
    playingRef.current = true
    setPlaying(true)
    setIndex(nextIndex)
  }

  const formatTime = (value) => {
    if (!Number.isFinite(value) || value <= 0) return '--:--'
    return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(Math.floor(value % 60)).padStart(2, '0')}`
  }

  const collage = dailyRotation.tracks.slice(0, 4)
  const ROW_H = 56 // tinggi satu baris lagu (px), sama dengan h-14
  const offset = Math.min(index, Math.max(0, dailyRotation.tracks.length - 3))

  return (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="show"
    custom={4}
    className="glass glass-hover relative w-full max-w-[500px] overflow-hidden rounded-3xl p-5 sm:p-6 mx-auto lg:mr-0 lg:ml-auto"
  >
    <audio ref={audioRef} preload="metadata" />

    {/* Judul + deskripsi */}
    <h2 className="font-display text-2xl font-bold text-star sm:text-3xl">
      {dailyRotation.title}
    </h2>
    <p className="mt-2 mb-5 max-w-md text-sm leading-relaxed text-muted">
      A curated collection of tracks that keep me in the zone and inspired while coding.
    </p>

    {/* Kartu player */}
    <div className="overflow-hidden rounded-xl bg-[#121212] ring-1 ring-white/10">
      {/* Blok atas */}
      <div className="relative bg-[#282828] p-4">
        <div className="flex gap-4">
          {/* Kolase cover 2x2 */}
          <div className="grid h-[5.5rem] w-[5.5rem] shrink-0 grid-cols-2 overflow-hidden rounded-md sm:h-24 sm:w-24">
            {collage.map((t) => (
              <img
                key={t.name}
                src={t.cover}
                alt={`Cover ${t.name}`}
                className="h-full w-full object-cover"
              />
            ))}
          </div>

          {/* Info lagu */}
          <div className="min-w-0 flex-1 pr-7">
            <p className="truncate text-xl font-bold text-white underline underline-offset-2 sm:text-2xl">
              {track.name}
            </p>
            <p className="mt-1 truncate text-sm text-white/60">{track.artist}</p>

            <a
              href={dailyRotation.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white/90 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-6 w-6">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
              Save on Spotify
            </a>
          </div>
        </div>

        {/* Logo Spotify (pojok kanan atas) */}
        <a
          href={dailyRotation.url}
          target="_blank"
          rel="noreferrer"
          aria-label="Buka di Spotify"
          className="absolute top-4 right-4 text-white"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.59 14.42a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.81-.87 7.08-.5 9.72 1.11.3.18.39.56.21.86Zm1.22-2.94a.78.78 0 0 1-1.08.26c-2.68-1.65-6.78-2.13-9.95-1.16a.78.78 0 1 1-.45-1.49c3.63-1.1 8.15-.57 11.21 1.31.37.22.49.7.27 1.08Zm.11-3.06c-3.22-1.91-8.52-2.09-11.62-1.16a.93.93 0 1 1-.54-1.79c3.53-1.07 9.4-.86 13.11 1.34a.93.93 0 0 1-.95 1.61Z" />
          </svg>
        </a>

        {/* Baris bawah: badge Preview + kontrol */}
        <div className="mt-4 flex items-center justify-between">
          <span className="rounded-[3px] bg-white/80 px-1.5 py-0.5 text-[9px] font-bold text-black">
            Preview
          </span>

          <div className="flex items-center gap-4 text-white/70">
            <button onClick={() => skip(-1)} aria-label="Sebelumnya" className="transition-colors hover:text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M6 5h2v14H6zM20 5v14L9 12z" />
              </svg>
            </button>
            <button onClick={() => skip(1)} aria-label="Berikutnya" className="transition-colors hover:text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
              </svg>
            </button>
            <span className="text-lg leading-none tracking-widest" aria-hidden="true">···</span>

            <motion.button
              onClick={togglePlaying}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label={playing ? 'Jeda' : 'Putar'}
              className="grid h-12 w-12 place-items-center rounded-full bg-white text-black"
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M7 4.5h3.2v15H7zM13.8 4.5H17v15h-3.2z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.72-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>

        {/* Garis progres tipis di tepi bawah */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-white/80 transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Daftar lagu: jendela 3 baris, bergeser ke atas */}
      <div className="h-[8rem] overflow-hidden">
        <motion.ul
          animate={{ y: -offset * ROW_H }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {dailyRotation.tracks.map((t, i) => {
            const active = i === index
            return (
              <li key={t.name}>
                <button
                  onClick={() => selectTrack(i)}
                  className="group flex h-14 w-full items-center gap-4 px-4 text-left transition-colors hover:bg-white/5"
                >
                  <span className="grid w-4 shrink-0 place-items-center font-mono text-xs text-white/50">
                    {active ? <Equalizer playing={playing} /> : i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-sm font-semibold ${
                        active ? 'text-accent-light' : 'text-white'
                      }`}
                    >
                      {t.name}
                    </span>
                    <span className="block truncate text-xs text-white/55">{t.artist}</span>
                  </span>
                  <span className="font-mono text-xs text-white/60 tabular-nums">
                    {active ? formatTime(duration) : '--:--'}
                  </span>
                </button>
              </li>
            )
          })}
        </motion.ul>
      </div>
    </div>
  </motion.div>
)
}

function IconButton({ label, onClick, active = false, children }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
      className={`text-muted transition-colors hover:text-accent-light ${active ? 'text-accent-light' : ''}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        {children}
      </svg>
    </motion.button>
  )
}

/* ================= Hero ================= */
export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center px-5 pt-28 pb-28 sm:pt-32 sm:pb-24"
    >
      <motion.div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ---------- Kolom kiri ---------- */}
        <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.04] px-4 py-1.5 ring-1 ring-white/10 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light shadow-[0_0_10px_2px_rgba(96,165,250,0.8)]" />
            <span className="font-mono text-xs font-medium tracking-[0.18em] text-accent-light uppercase">
              {profile.role}
            </span>
          </motion.div>

          {/* Heading + typewriter */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 text-[clamp(2.25rem,9vw,4rem)] leading-[1.1] font-extrabold tracking-[-0.03em] lg:text-[clamp(2.25rem,5.6vw,4rem)]"
          >
            <span className="block text-star">{profile.heroLead}</span>
            <span className="mt-3 block min-h-[1.1em]">
              <Typewriter
                words={profile.heroLines}
                typeSpeed={78}
                deleteSpeed={38}
                holdTime={1900}
                className="text-gradient animate-shimmer font-bold"
              />
            </span>
          </motion.h1>

          {/* Deskripsi */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-4 max-w-lg text-base leading-[1.8] font-normal text-muted"
          >
            {profile.headline}
          </motion.p>

          {/* Tombol */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <motion.a
              href="#portfolio"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white shadow-[0_8px_28px_-8px_rgba(44,103,237,0.9)] transition-colors duration-300 hover:brightness-110"
            >
              Project
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
              </svg>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white/[0.03] px-6 text-sm font-semibold text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.07] hover:ring-white/25"
            >
              Contact Me
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Find me + sosial media */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-8 w-full max-w-md"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              <span className="font-mono text-[11px] tracking-[0.2em] whitespace-nowrap text-muted uppercase">
                Find Me
              </span>

              <ul className="flex items-center gap-3">
                {socials.map((s) => (
                  <li key={s.name}>
                    <motion.a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      whileHover={{ y: -4 }}
                      className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.03] text-muted ring-1 ring-white/10 transition-all duration-300 hover:bg-accent/15 hover:text-white hover:ring-accent/50"
                    >
                      <SocialIcon name={s.name} className="h-[18px] w-[18px]" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ---------- Kolom kanan ---------- */}
        <DailyRotation />
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Gulir ke bawah"
        animate={reduce ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted/60 transition-colors hover:text-accent-light"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="grid h-9 w-[22px] place-items-start rounded-full border border-current pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-current" />
        </span>
      </motion.a>
    </section>
  )
}