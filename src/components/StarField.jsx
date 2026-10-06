import { useEffect, useRef } from 'react'

/**
 * Canvas starfield:
 * - Parallax kedalaman mengikuti posisi mouse
 * - Bintang twinkling
 * - Shooting star sesekali
 */
export default function StarField({ density = 0.00008 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0
    let stars = []
    let shoot = null
    let nextShoot = 0

    const mouse = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }
    const scroll = { y: 0 }

    function build() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(340, Math.max(90, Math.floor(w * h * density)))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.85 + 0.15, // depth
        r: Math.random() * 1.3 + 0.35,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.025 + 0.008,
        // Gerakan lambat konstan supaya bintang tetap hidup tanpa scroll.
        // Kecepatan dibuat cukup terlihat agar titik-titik putih terasa
        // mengalir seperti debu/bintang di ruang angkasa.
        vx: (Math.random() - 0.5) * 0.16,
        vy: Math.random() * 0.22 + 0.08,
        hue: Math.random() > 0.86 ? 215 : 225, // sedikit biru
      }))
    }

    function spawnShootingStar() {
      const fromLeft = Math.random() > 0.35
      shoot = {
        x: fromLeft ? -60 : Math.random() * w,
        y: Math.random() * h * 0.55,
        vx: (fromLeft ? 1 : -1) * (Math.random() * 5 + 7),
        vy: Math.random() * 2.4 + 1.2,
        life: 0,
        max: 78,
        len: 150 + Math.random() * 130,
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)

      // easing untuk parallax
      eased.x += (mouse.x - eased.x) * 0.045
      eased.y += (mouse.y - eased.y) * 0.045

      for (const s of stars) {
        s.tw += s.tws
        s.x += s.vx * (0.45 + s.z)
        s.y += s.vy * (0.45 + s.z)

        // Munculkan kembali bintang dari sisi berlawanan saat keluar layar.
        if (s.x < -4) s.x = w + 4
        if (s.x > w + 4) s.x = -4
        if (s.y > h + 4) s.y = -4

        const twinkle = reduce ? 0.7 : 0.45 + Math.abs(Math.sin(s.tw)) * 0.55

        // parallax: bintang dekat bergerak lebih cepat
        const px = s.x - eased.x * s.z * 26
        const py = s.y - eased.y * s.z * 26 - scroll.y * s.z * 0.16

        // wrap kalau keluar frame
        const wrappedX = ((px % w) + w) % w
        const wrappedY = ((py % h) + h) % h

        ctx.beginPath()
        ctx.arc(wrappedX, wrappedY, s.r * s.z, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue}, 90%, ${s.z > 0.6 ? 92 : 78}%, ${twinkle * s.z})`
        ctx.fill()

        // glow kecil untuk bintang paling terang
        if (s.z > 0.75 && !reduce) {
          ctx.beginPath()
          ctx.arc(wrappedX, wrappedY, s.r * s.z * 3.4, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${s.hue}, 95%, 70%, ${twinkle * 0.06})`
          ctx.fill()
        }
      }

      // shooting star
      if (!reduce) {
        if (!shoot && Date.now() > nextShoot) {
          spawnShootingStar()
          nextShoot = Date.now() + 4000 + Math.random() * 7000
        }
        if (shoot) {
          shoot.x += shoot.vx
          shoot.y += shoot.vy
          shoot.life += 1
          const t = shoot.life / shoot.max
          const alpha = Math.max(0, 1 - t)

          const grad = ctx.createLinearGradient(
            shoot.x,
            shoot.y,
            shoot.x - shoot.vx * shoot.len * 0.1,
            shoot.y - shoot.vy * shoot.len * 0.1,
          )
          grad.addColorStop(0, `rgba(190, 214, 255, ${alpha * 0.95})`)
          grad.addColorStop(0.35, `rgba(44, 103, 237, ${alpha * 0.55})`)
          grad.addColorStop(1, 'rgba(44, 103, 237, 0)')

          ctx.beginPath()
          ctx.moveTo(shoot.x, shoot.y)
          ctx.lineTo(shoot.x - shoot.vx * shoot.len * 0.1, shoot.y - shoot.vy * shoot.len * 0.1)
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.8
          ctx.lineCap = 'round'
          ctx.stroke()

          if (shoot.life > shoot.max || shoot.x > w + 200 || shoot.x < -200) shoot = null
        }
      }

      raf = requestAnimationFrame(draw)
    }

    function onPointer(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    function onScroll() {
      scroll.y = window.scrollY
    }

    build()
    draw()
    window.addEventListener('resize', build)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
