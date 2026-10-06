import { useEffect, useRef, useState } from 'react'

/**
 * Teks mengetik sendiri, bergantian antar kata.
 * Mendukung: efek cursor, jeda sebelum & sesudah ketik.
 */
export default function Typewriter({
  words = [],
  typeSpeed = 85,
  deleteSpeed = 45,
  holdTime = 1700,
  className = '',
}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing') // typing | holding | deleting
  const timer = useRef(null)

  useEffect(() => {
    if (!words.length) return
    const word = words[index % words.length]

    if (phase === 'typing') {
      if (text === word) {
        timer.current = setTimeout(() => setPhase('deleting'), holdTime)
        return () => clearTimeout(timer.current)
      }
      timer.current = setTimeout(
        () => setText(word.slice(0, text.length + 1)),
        typeSpeed,
      )
    } else if (phase === 'deleting') {
      if (text === '') {
        setPhase('typing')
        setIndex((i) => (i + 1) % words.length)
        return
      }
      timer.current = setTimeout(
        () => setText(word.slice(0, text.length - 1)),
        deleteSpeed,
      )
    }

    return () => clearTimeout(timer.current)
  }, [text, phase, index, words, typeSpeed, deleteSpeed, holdTime])

  return (
    <span className={className}>
      {text}
      <span className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.1em] animate-blink bg-accent-light align-middle" />
    </span>
  )
}
