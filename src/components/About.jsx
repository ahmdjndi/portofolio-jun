import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { about, profile, stats } from '../data/profile'
import { Reveal } from './Section'

/* ---------- Counter angka statistik ---------- */
function Counter({ value, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: duration / 1000,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString('id-ID')}
      {suffix}
    </span>
  )
}

/* ---------- Poster utama (gaya PORTFOLIO) ---------- */
/* ---------- Poster utama (gaya PORTFOLIO) ---------- */
function PosterHero() {
  const [error, setError] = useState(false)
  const posterPhoto = '/Foto%20Saya.png'
  const fontAnton = { fontFamily: '"Anton", Impact, sans-serif' }
  const fontScript = { fontFamily: '"Mr De Haviland", cursive' }

  return (
    <Reveal>
      <div className="relative mx-auto min-h-[900px] w-full max-w-[1200px] overflow-hidden md:aspect-[3/2] md:min-h-[560px]">
        {/* 1. Tulisan besar di belakang (pas lebar, memanjang ke bawah) */}
<svg
  role="img"
  aria-label="PORTFOLIO"
  viewBox="0 0 1000 300"
  preserveAspectRatio="none"
  className="pointer-events-none absolute top-0 left-0 z-[1] h-[48%] w-full overflow-visible select-none md:h-[72%]"
>
  <defs>
    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#2c67ed" />
      <stop offset="45%" stopColor="#5b8cff" />
      <stop offset="95%" stopColor="#030f2b" stopOpacity="0.9" />
    </linearGradient>
  </defs>
 <text
  x="0"
  y="298"
  textLength="1000"
  lengthAdjust="spacingAndGlyphs"
  fill="url(#portfolioGradient)"
  fontSize="340"
  fontFamily='"Anton", Impact, sans-serif'
>
  PORTOFOLIO
</text>
</svg>

        {/* 2. Foto di tengah, bagian bawah memudar */}
        {error ? (
          <div className="absolute bottom-0 left-1/2 z-[2] grid h-[92%] w-[48%] -translate-x-1/2 place-items-center">
            <span className="font-display text-7xl font-black text-white/85">
              {profile.initials}
            </span>
          </div>
        ) : (
          <img
            src={posterPhoto}
            alt={`Foto profil ${profile.name}`}
            onError={() => setError(true)}
            className="absolute top-[8%] left-1/2 z-[2] h-[55%] w-full -translate-x-1/2 object-contain object-top md:top-auto md:bottom-0 md:h-[92%] md:w-[48%] md:object-bottom"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
            }}
          />
        )}

        {/* 3. Konten kiri: perkenalan */}
        <div className="absolute bottom-[22%] left-[5%] z-[4] w-[90%] md:bottom-[6%] md:left-[4%] md:w-[31%]">
          <p
            className="mb-1.5 leading-none text-white"
            style={{ ...fontScript, fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            Hello, I'm
          </p>
          <h3
            className="leading-[1.02] tracking-[1px] text-white uppercase"
            style={{ ...fontAnton, fontSize: 'clamp(40px, 6.4vw, 78px)' }}
          >
            {profile.name}
          </h3>
          <p
            className="mt-3.5 font-semibold tracking-[1.5px] text-[#2c67ed] uppercase"
            style={{ fontSize: 'clamp(12px, 1.4vw, 16px)' }}
          >
            {profile.role}
          </p>
          <p
            className="mt-3.5 leading-relaxed text-[#a8a8a8]"
            style={{ fontSize: 'clamp(11px, 1vw, 12.5px)' }}
          >
            {profile.headline}
          </p>

          <div className="mt-4 flex items-center gap-2 text-[10px] tracking-[1px] text-[#a8a8a8] uppercase">
            <i className="relative inline-block h-4 w-4 rounded-full border-[1.5px] border-[#2c67ed]">
              <i className="absolute inset-x-0 inset-y-[3px] border-y border-[#2c67ed]" />
            </i>
            {profile.availability}
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="mt-3 inline-block text-[11px] tracking-wide text-white/80 underline-offset-4 transition-colors hover:text-[#d3141b] hover:underline"
          >
            {profile.email}
          </a>
        </div>

        {/* 4. Tagline kanan tengah */}
        <div className="absolute top-[40%] right-[5%] z-[4] flex max-w-[190px] items-center gap-3 text-[11px] leading-normal text-white md:top-[46%] md:right-[8%]">
          <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full border border-[#444] text-sm">
            ✦
          </div>
          <p>{profile.tagline}</p>
        </div>

        {/* 5. Statistik kanan bawah */}
        <div className="absolute right-[5%] bottom-[3%] z-[4] flex w-[90%] md:right-[3%] md:bottom-[4%] md:block md:w-[21%]">
          {stats.slice(0, 3).map((s) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col items-start gap-0.5 border-l border-[#333] pl-2.5 first:border-l-0 first:pl-0 md:flex-row md:items-center md:gap-3.5 md:border-t md:border-l-0 md:py-3 md:pl-0 md:first:border-t-0"
            >
              <strong className="min-w-[62px] text-[clamp(22px,3vw,36px)] font-medium text-[#2c67ed]">
                <Counter value={s.value} suffix={s.suffix} />
              </strong>
              <span className="text-[9px] leading-snug tracking-[1px] text-[#a8a8a8] uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

/* ---------- Timeline item ---------- */
function TimelineItem({ badge, title, org, meta, accent }) {
  return (
    <Reveal>
      <div className="group relative pl-8">
        {/* titik + garis */}
        <span className="absolute top-2 left-0 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(44,103,237,0.15),0_0_14px_2px_rgba(44,103,237,0.8)] transition-transform duration-300 group-hover:scale-125" />
        <span className="absolute top-6 bottom-[-1.5rem] left-[4px] w-px bg-gradient-to-b from-accent/40 to-transparent" />

        <div className="glass glass-hover rounded-2xl p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wide ${
                accent
                  ? 'bg-accent/20 text-accent-light ring-1 ring-accent/40'
                  : 'bg-white/5 text-muted ring-1 ring-white/10'
              }`}
            >
              {badge}
            </span>
          </div>
          <h4 className="mt-2.5 font-semibold text-star">{title}</h4>
          <p className="text-sm text-accent-light/85">{org}</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{meta}</p>
        </div>
      </div>
    </Reveal>
  )
}

function getInitials(text) {
  return text
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function EducationCard({ logo, title, org, year }) {
  return (
    <div className="glass glass-hover flex items-center gap-4 rounded-2xl p-4">
      <div className="grid h-14 w-14 shrink-0 place-items-center">
  {logo ? (
    <img
      src={logo}
      alt={`Logo ${title}`}
      className="h-full w-full object-contain"
    />
  ) : (
          <span className="font-display text-sm font-bold text-accent-light">
            {getInitials(title)}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-base font-semibold leading-snug text-star">
          {title}
        </h4>
        <p className="mt-0.5 text-sm text-muted">{org}</p>
        <p className="mt-1.5 font-mono text-xs tracking-wide text-accent-light">
          {year}
        </p>
      </div>
    </div>
  )
}

function ExperienceCard({ logo, title, role, period }) {
  return (
    <div className="glass glass-hover flex items-center gap-4 rounded-2xl p-4">
      {/* Logo kotak; kalau tidak ada logo, tampilkan inisial */}
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/[0.06] ring-1 ring-white/10">
        {logo ? (
          <img
            src={logo}
            alt={`Logo ${title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-display text-sm font-bold text-accent-light">
            {getInitials(title)}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-base font-semibold leading-snug text-star">
          {title}
        </h4>
        <p className="mt-0.5 text-sm text-muted">{role}</p>
        <p className="mt-1.5 font-mono text-xs tracking-wide text-accent-light">
          {period}
        </p>
      </div>
    </div>
  )
}

/* ---------- Section utama ---------- */
export default function About() {
  return (
    <section id="about" className="relative scroll-mt-16 px-5 py-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <PosterHero />

        {/* Pendidikan & Pengalaman */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-sm ring-1 ring-accent/40">
                  🎓
                </span>
                <h3 className="font-display text-xl font-bold text-star">
                  Riwayat Pendidikan
                </h3>
              </div>
            </Reveal>
            <div className="space-y-4">
  {about.education.map((e) => (
    <Reveal key={e.title}>
      <EducationCard
        logo={e.logo}
        title={e.title}
        org={e.org}
        year={e.year}
      />
    </Reveal>
  ))}
</div>
          </div>

          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-sm ring-1 ring-accent/40">
                  💼
                </span>
                <h3 className="font-display text-xl font-bold text-star">
                  Pengalaman
                </h3>
              </div>
            </Reveal>
            <div className="space-y-4">
  {about.experience.map((e) => (
    <Reveal key={`${e.org}-${e.role}`}>
      <ExperienceCard
        logo={e.logo}
        title={e.org}
        role={e.role}
        period={e.period}
      />
    </Reveal>
  ))}
</div>
          </div>
        </div>
      </div>
    </section>
  )
}