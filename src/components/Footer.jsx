import { motion } from 'framer-motion'
import { useState } from 'react'
import { profile, socials } from '../data/profile'

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear())
  return (
    <footer className="relative border-t border-white/8 px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        {/* Logo besar dengan glow */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.06 }}
          className="group relative"
          aria-label="Kembali ke atas"
        >
          <span className="absolute inset-0 rounded-full bg-accent/25 blur-2xl transition-all duration-500 group-hover:bg-accent/50" />
          <span className="relative font-display text-2xl font-black tracking-tight text-glow text-star sm:text-3xl">
            {profile.name}
          </span>
        </motion.a>

        <p className="max-w-md text-[13px] leading-relaxed text-muted">
          Terima kasih sudah meluangkan waktu untuk membaca
          <span className="mx-1 text-accent">✦</span>
          semoga ada yang menginspirasi di sini.
        </p>

        {/* Sosial icon */}
        <ul className="flex items-center gap-3">
          {socials.map((s) => (
            <li key={s.name}>
              <motion.a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                whileHover={{ y: -4, scale: 1.1 }}
                className="glass glass-hover grid h-10 w-10 place-items-center rounded-full"
              >
                <span className="text-[10px] font-bold text-star/80">
                  {s.name.slice(0, 2).toUpperCase()}
                </span>
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="h-px w-full max-w-sm bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <p className="font-mono text-[11px] text-muted/70">
          © {year} {profile.name} · Dibangun dengan React,
          Tailwind CSS & Framer Motion
        </p>
      </div>
    </footer>
  )
}
