import StarField from './StarField'

export default function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Latar hitam polos dengan bintang kecil */}
      <StarField />
    </div>
  )
}
