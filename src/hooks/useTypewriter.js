import { useEffect, useState } from 'react'

/**
 * Types and deletes strings in a loop for hero role cycling.
 * @param {string[]} words
 * @param {{ typingSpeed?: number, deletingSpeed?: number, pauseMs?: number }} options
 */
export function useTypewriter(
  words = [],
  { typingSpeed = 80, deletingSpeed = 45, pauseMs = 1600 } = {},
) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return undefined

    const current = words[index % words.length]
    let timeout

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
    } else {
      const next = isDeleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1)

      timeout = setTimeout(
        () => setText(next),
        isDeleting ? deletingSpeed : typingSpeed,
      )
    }

    return () => clearTimeout(timeout)
  }, [words, index, text, isDeleting, typingSpeed, deletingSpeed, pauseMs])

  return text
}
