import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { certificates, projects, techStack } from '../data/profile'
import { Reveal, SectionHeading } from './Section'

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'stack', label: 'Tech Stack' },
]

/* ================= Projects ================= */
function ProjectCard({ project, i }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="glass glass-hover group relative flex flex-col overflow-hidden rounded-3xl p-5 sm:p-6"
    >
      {/* glow yang muncul saat hover */}
      <span
        className="pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: project.color }}
      />

      {/* ikon orbit */}
      <div className="relative mb-5 flex items-center justify-between">
        <span
          className="grid h-12 w-12 place-items-center rounded-2xl font-display text-lg font-bold text-star transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
          style={{
            background: `linear-gradient(135deg, ${project.color}44, ${project.color}11)`,
            boxShadow: `inset 0 0 0 1px ${project.color}66`,
          }}
        >
          {project.title.charAt(0)}
        </span>
        <span className="font-mono text-[10px] text-muted/70">{project.year}</span>
      </div>

      <h3 className="relative text-lg font-semibold text-star transition-colors group-hover:text-accent-light">
        {project.title}
      </h3>
      <p className="relative mt-0.5 font-mono text-[11px] tracking-wide text-accent-light/80">
        {project.category}
      </p>
      <p className="relative mt-3 flex-1 text-[13px] leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] text-muted ring-1 ring-white/10 transition-colors group-hover:ring-accent/40"
          >
            {t}
          </span>
        ))}
      </div>

      {/* garis bawah neon */}
      <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent to-accent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  )
}

function ProjectsTab() {
  return (
    <motion.div
      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      initial="hidden"
      animate="show"
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} i={i} />
      ))}
    </motion.div>
  )
}

/* ================= Certificates ================= */

function CertificatesTab() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {certificates.map((c, i) => (
        <Reveal key={c.id} delay={i * 0.07}>
          <motion.div
            whileHover={{ y: -5, scale: 1.015 }}
            transition={{ duration: 0.25 }}
            className="glass glass-hover group relative h-full overflow-hidden rounded-xl border border-white/10"
          >
            {/* Gambar sertifikat */}
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <img
                src={c.image}
                alt={`Sertifikat ${c.title}`}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Overlay saat hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute bottom-3 left-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md">
                  {c.year}
                </span>
              </div>
            </div>

            {/* Aksen garis saat hover */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-accent via-blue-400 to-cyan-400 transition-all duration-500 group-hover:w-full" />
          </motion.div>
        </Reveal>
      ))}
    </div>
  )
}


/* ================= Tech Stack ================= */
function TechCard({ tech, index }) {
  const [failed, setFailed] = useState(false)

  return (
    <Reveal delay={index * 0.05}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass glass-hover group flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl p-3"
      >
        {failed ? (
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 font-display text-xl font-bold text-accent-light ring-1 ring-accent/40">
            {tech.name[0]}
          </span>
        ) : (
          <img
            src={tech.icon}
            alt={tech.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
          />
        )}
        <span className="text-center text-[12px] font-semibold text-star/90 sm:text-[13px]">
          {tech.name}
        </span>
      </motion.div>
    </Reveal>
  )
}

function TechStackTab() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
      {techStack.map((tech, i) => (
        <TechCard key={tech.name} tech={tech} index={i} />
      ))}
    </div>
  )
}

/* ================= Section ================= */
export default function Portfolio() {
  const [tab, setTab] = useState('projects')
  const layoutId = useRef('portfolio-tab')

  return (
    <section id="portfolio" className="relative scroll-mt-20 px-5 pt-0 pb-10 sm:pt-2 sm:pb-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Portfolio"
          subtitle="Kumpulan karya, sertifikasi, dan teknologi yang saya pakai sehari-hari."
        />

        {/* Tab bar */}
       <Reveal delay={0.15} className="mt-10 flex justify-center">
  <div
    role="tablist"
    aria-label="Portfolio tabs"
    className="
      relative flex
      rounded-xl
      border border-white/[0.08]
      bg-white/[0.02]
      p-1
      backdrop-blur-sm
    "
  >
    {TABS.map((t) => {
      const isActive = tab === t.id

      return (
        <button
          key={t.id}
          role="tab"
          aria-selected={isActive}
          onClick={() => {
            layoutId.current = `portfolio-${t.id}`
            setTab(t.id)
          }}
          className={`
            relative
            min-w-[110px]
            px-5 py-2.5
            text-sm font-medium
            transition-all duration-300
            sm:min-w-[130px]
            sm:px-7
            ${
              isActive
                ? 'text-white'
                : 'text-muted hover:text-white/80'
            }
          `}
        >
          {isActive && (
            <motion.span
              layoutId="portfolio-active-tab"
              className="
                absolute inset-0
                rounded-lg
                border border-accent/30
                bg-accent/[0.08]
              "
              style={{
                boxShadow:
                  '0 0 20px rgba(44,103,237,0.12)',
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 30,
              }}
            />
          )}

          <span className="relative z-10">
            {t.label}
          </span>
        </button>
      )
    })}
  </div>
</Reveal>

        {/* Konten tab */}
        <div className="mt-12 min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === 'projects' && <ProjectsTab />}
              {tab === 'certificates' && <CertificatesTab />}
              {tab === 'stack' && <TechStackTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
