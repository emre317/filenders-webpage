export default function VideoBackdrop({ src, dim = true, className = '' }) {
  return (
    <div className={`photo-backdrop video-backdrop ${dim ? '' : 'video-backdrop-vivid'} ${className}`} aria-hidden="true">
      <video src={src} autoPlay muted loop playsInline preload="metadata" />
    </div>
  )
}
