import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { navLinks } from '../data/profile'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let frame = 0

    const updateOnScroll = () => {
      setScrolled(window.scrollY > 40)

      // tentukan section yang sedang terlihat
      const probe = window.scrollY + window.innerHeight * 0.35
      let current = navLinks[0].id
      for (const link of navLinks) {
        const el = document.getElementById(link.id)
        if (el && el.offsetTop <= probe) current = link.id
      }
      setActive((previous) => (previous === current ? previous : current))
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        updateOnScroll()
      })
    }

    updateOnScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <motion.nav
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="fixed top-4 left-1/2 z-50 w-fit max-w-[calc(100%-1.5rem)] -translate-x-1/2"
    >
      <motion.div
        animate={{
          boxShadow: scrolled
            ? [
              '0 0 0 1px rgba(44,103,237,0.2), 0 0 14px -6px rgba(44,103,237,0.25)',
              '0 0 0 1px rgba(44,103,237,0.3), 0 0 14px -6px rgba(44,103,237,0.4)',
              '0 0 0 1px rgba(44,103,237,0.2), 0 0 14px -6px rgba(44,103,237,0.25)',
        ]
            : '0 0 0 1px rgba(255,255,255,0.07), 0 0 0px rgba(44,103,237,0)',
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="glass relative overflow-hidden rounded-full px-2 py-2 transition-colors duration-500 sm:px-3"
      >
        {/* kilau biru di dalam navbar */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_140%_at_50%_0%,rgba(44,103,237,0.22),transparent_60%)]" />
        {/* garis bawah neon */}
        <div className="pointer-events-none absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />

        <div className="relative flex items-center justify-center gap-1 sm:gap-2">
          {/* Navigasi tetap satu baris di semua ukuran layar */}
          <ul className="flex items-center gap-0.5 sm:gap-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="relative block whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-medium transition-colors duration-300 sm:px-5 sm:text-sm"
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent/20 ring-1 ring-accent/60"
                      style={{ boxShadow: '0 0 10px -2px rgba(44,103,237,0.8)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      active === link.id ? 'text-star' : 'text-muted hover:text-star'
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

        </div>
      </motion.div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="glass mt-2 overflow-hidden rounded-3xl"
          >
            <ul className="flex flex-col p-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                      active === link.id
                        ? 'bg-accent/20 text-star'
                        : 'text-muted hover:bg-white/5 hover:text-star'
                    }`}
                  >
                    {link.label}
                    <span className="font-mono text-[10px] text-accent-light/60">
                      0{navLinks.indexOf(link) + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
