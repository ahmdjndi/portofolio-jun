import { motion, useReducedMotion } from 'framer-motion'

/** Judul section dengan garis dekoratif + aksen biru. */
export function SectionHeading({ index, title, subtitle, align = 'center' }) {
  const center = align === 'center'

  return (
    <div className={center ? 'text-center' : ''}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center gap-4 ${center ? 'justify-center' : ''}`}
      >
        {center && <Line side="left" />}
        <span className="font-mono text-xs tracking-[0.35em] text-accent-light">
          {index}
        </span>
        <h2 className="font-display text-[clamp(1.7rem,5vw,2.9rem)] font-bold tracking-tight text-star">
          {title}
        </h2>
        {center && <Line side="right" />}
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-muted ${
            center ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

function Line({ side }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: side === 'left' ? 'right' : 'left' }}
      className="hidden h-px w-16 bg-gradient-to-r from-transparent to-accent/60 sm:block"
    />
  )
}

/** Wrapper animasi masuk saat di-scroll. */
export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] ?? motion.div

  return (
    <Comp
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Comp>
  )
}

/** Kartu kaca generik dengan efek glow lembut. */
export function GlassCard({ children, className = '', ...rest }) {
  return (
    <div className={`glass glass-hover relative overflow-hidden rounded-3xl ${className}`} {...rest}>
      {/* sudut bercahaya */}
      <span className="pointer-events-none absolute -top-px -left-px h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
      {children}
    </div>
  )
}
