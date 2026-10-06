import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { profile, socials } from '../data/profile'
import { Reveal, SectionHeading } from './Section'
import SocialIcon from './SocialIcon'

const FIELDS = [
  { name: 'name', label: 'Nama', type: 'text', placeholder: 'Nama lengkapmu' },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'email@contoh.com',
  },
  {
    name: 'message',
    label: 'Pesan',
    type: 'textarea',
    placeholder: 'Ceritakan project atau idemu…',
  },
]

function Field({ field, value, onChange, error }) {
  const base =
    'w-full rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-star placeholder:text-muted/45 ring-1 transition-all duration-300 outline-none focus:bg-white/[0.07] focus:ring-2'
  const ring = error
    ? 'ring-red-400/60 focus:ring-red-400'
    : 'ring-white/10 focus:ring-accent'

  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
        {field.label}
      </span>
      {field.type === 'textarea' ? (
        <textarea
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          className={`${base} ${ring} resize-none`}
        />
      ) : (
        <input
          type={field.type}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          className={`${base} ${ring}`}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 block text-[11px] text-red-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent

  function handleChange(e) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((err) => ({ ...err, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    if (!values.name.trim()) next.name = 'Nama tidak boleh kosong'
    if (!/^\S+@\S+\.\S+$/.test(values.email))
      next.email = 'Format email tidak valid'
    if (values.message.trim().length < 10)
      next.message = 'Pesan minimal 10 karakter'

    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('sending')
    // TODO: ganti dengan fetch ke backend / Formspree / EmailJS kamu
    setTimeout(() => {
      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        setValues({ name: '', email: '', message: '' })
      }, 2600)
    }, 1100)
  }

  return (
    <section id="contact" className="relative scroll-mt-20 px-5 pt-0 pb-16 sm:pt-2 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Contact"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Sosial media */}
          <Reveal>
            <div className="glass relative h-full overflow-hidden rounded-3xl p-6 sm:p-8">
              <span className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

              <h3 className="relative font-display text-xl font-bold text-star">
                Mari Terhubung
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">
                Saya biasanya membalas dalam 1–2 hari kerja. Temukan saya di salah
                satu platform di bawah ini.
              </p>

              <ul className="relative mt-8 space-y-3">
                {socials.map((s) => (
                  <li key={s.name}>
                    <motion.a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ x: 6 }}
                      className="group flex items-center gap-4 rounded-2xl bg-white/[0.03] p-3.5 ring-1 ring-white/8 transition-all duration-300 hover:bg-accent/10 hover:ring-accent/50"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 transition-all duration-300 group-hover:bg-accent group-hover:shadow-[0_0_20px_-2px_rgba(44,103,237,0.9)]">
                        <SocialIcon name={s.name} className="h-5 w-5 text-star" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-star">
                          {s.name}
                        </span>
                        <span className="block truncate font-mono text-[11px] text-muted">
                          {s.handle}
                        </span>
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 shrink-0 stroke-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:stroke-accent-light"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <div className="relative mt-8 rounded-2xl bg-void-2/60 p-4 ring-1 ring-white/8">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  Lokasi
                </p>
                <p className="mt-1.5 text-sm text-star">{profile.location}</p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.12}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass relative h-full overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              <span className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />

              <h3 className="relative font-display text-xl font-bold text-star">
                Kirim Pesan
              </h3>
              <p className="relative mt-2 text-sm text-muted">
                Isi form di bawah, ya. Semua data hanya disimpan di browser
                kamu.
              </p>

              <div className="relative mt-7 space-y-5">
                {FIELDS.map((f) => (
                  <Field
                    key={f.name}
                    field={f}
                    value={values[f.name]}
                    onChange={handleChange}
                    error={errors[f.name]}
                  />
                ))}

                <motion.button
                  type="submit"
                  disabled={status !== 'idle'}
                  whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.97 } : {}}
                  className="group relative w-full overflow-hidden rounded-xl bg-accent py-3.5 font-semibold text-white shadow-[0_0_28px_-6px_rgba(44,103,237,0.9)] transition-opacity disabled:opacity-80"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    {status === 'sending' && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    )}
                    {status === 'sent' ? 'Terkirim! Terima kasih ✦' : 'Kirim Pesan'}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {status === 'sent' && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-[12px] text-accent-light"
                    >
                      Pesanmu sudah masuk. Saya akan segera membalas ✦
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
