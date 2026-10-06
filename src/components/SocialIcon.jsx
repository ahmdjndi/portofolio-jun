import { SOCIAL_PATHS } from './socialPaths'

export default function SocialIcon({ name, className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={SOCIAL_PATHS[name]} />
    </svg>
  )
}
