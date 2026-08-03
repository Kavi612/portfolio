import { useMemo, useState } from 'react'
import { useForm } from '@formspree/react'

// TODO: replace with real Formspree form ID from formspree.io
const FORMSPREE_FORM_ID = 'YOUR_FORM_ID'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({})

  const errors = useMemo(() => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = 'Enter a valid email.'
    if (!form.message.trim()) next.message = 'Message is required.'
    return next
  }, [form])

  const isValid = Object.keys(errors).length === 0

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!isValid || state.submitting) return
    await handleSubmit(event)
  }

  if (state.succeeded) {
    return (
      <div className="glow-card flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
        <p className="text-xl font-semibold text-text-main">Message sent. I&apos;ll reply soon.</p>
        <p className="mt-2 text-sm text-text-muted">
          Thanks for reaching out — I usually respond within a day.
        </p>
      </div>
    )
  }

  const inputClass =
    'contact-field w-full rounded-xl border border-blue-glow/60 bg-navy-950/80 px-4 py-3 text-sm text-blue-light placeholder:text-blue-light/40 outline-none transition focus:border-blue-accent focus:bg-navy-900 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.18)]'

  return (
    <form
      onSubmit={onSubmit}
      className="glow-card space-y-4 border-blue-glow/50 bg-navy-900/90 p-5 sm:p-6"
      noValidate
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Your name"
          className={inputClass}
          disabled={state.submitting}
          autoComplete="name"
        />
        {touched.name && errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="you@email.com"
          className={inputClass}
          disabled={state.submitting}
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Tell me about the role, project, or idea..."
          className={`${inputClass} resize-y`}
          disabled={state.submitting}
        />
        {touched.message && errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      {state.errors && (
        <p className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-300">
          Something went wrong. Check your Formspree form ID or try again in a moment.
        </p>
      )}

      <button
        type="submit"
        data-cursor="hover"
        disabled={!isValid || state.submitting}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-primary px-5 py-3 text-sm font-semibold text-white shadow-blue-glow transition enabled:hover:shadow-blue-glow-lg disabled:cursor-not-allowed disabled:opacity-45"
      >
        {state.submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
