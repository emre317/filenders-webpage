export default function PhotoBackdrop({ src, duration = 22 }) {
  return (
    <div className="photo-backdrop" aria-hidden="true">
      <img src={src} alt="" style={{ animationDuration: `${duration}s` }} />
    </div>
  )
}
