const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function ThermometerIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 14.5V4.5a2 2 0 0 0-4 0v10a4 4 0 1 0 4 0Z" />
      <path d="M12 9h-2.5" />
    </svg>
  )
}

export function TrainIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="3" width="14" height="13" rx="3" />
      <path d="M5 11h14" />
      <circle cx="8.5" cy="14" r="0.6" fill="currentColor" />
      <circle cx="15.5" cy="14" r="0.6" fill="currentColor" />
      <path d="M8 20 6 22M16 20l2 2M9 16.5v0M15 16.5v0" />
    </svg>
  )
}

export function ChevronDownIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function SunIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  )
}

export function MoonIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </svg>
  )
}

export function MenuIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  )
}

export function TruckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2 7h11v9H2z" />
      <path d="M13 10h4l4 3.2V16h-8z" />
      <circle cx="6.5" cy="17.5" r="1.75" />
      <circle cx="16.5" cy="17.5" r="1.75" />
    </svg>
  )
}

export function CpuIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  )
}

export function RouteIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M5 8v3a4 4 0 0 0 4 4h6a4 4 0 0 1 4 3" />
    </svg>
  )
}

export function WarehouseIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 10 12 4l9 6v9a1 1 0 0 1-1 1h-4v-6H8v6H4a1 1 0 0 1-1-1v-9Z" />
    </svg>
  )
}

export function ShieldIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4 6v6c0 4.5 3 7.5 8 9 5-1.5 8-4.5 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function CodeIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />
    </svg>
  )
}

export function DatabaseIcon(props) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5V12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5.5" />
      <path d="M5 12v6.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V12" />
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  )
}

export function PlaneIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2 16.5 22 9l-2.5-2.5-8 2-4.5-4.5-2 1 3 5-5.5 2-2-1.5-1.5 1 3 3Z" />
      <path d="M9 20.5 12 22l1-4" />
    </svg>
  )
}

export function CraneIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V6l7-4v19" />
      <path d="M11 4h9l-3 3" />
      <path d="M17 7v6.5" />
      <path d="M14.5 17h5" />
      <path d="M4 21h9" />
    </svg>
  )
}

export function ShipIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 15h18l-2 5H5l-2-5Z" />
      <path d="M6 15V9h4V5h4v4h0" />
      <path d="M8 9V6.5h6V9" />
      <path d="M12 2v3" />
    </svg>
  )
}

export function FlagIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 21V4" />
      <path d="M5 4h13l-3 4 3 4H5" />
    </svg>
  )
}

export function MapPinIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  )
}

export function ClipboardIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="9" y="2.5" width="6" height="3" rx="1" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4.5" />
    </svg>
  )
}

export function WeightIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="6" r="2.5" />
      <circle cx="17" cy="6" r="2.5" />
      <path d="M4.8 8.2 3 19a1 1 0 0 0 1 1.2h6a1 1 0 0 0 1-1.2l-1.8-10.8" />
      <path d="M14.8 8.2 13 19a1 1 0 0 0 1 1.2h6a1 1 0 0 0 1-1.2l-1.8-10.8" />
    </svg>
  )
}

export function BoxIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8 12 4l9 4-9 4-9-4Z" />
      <path d="M3 8v8l9 4 9-4V8" />
      <path d="M12 12v8" />
    </svg>
  )
}

export function TrailerIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2 16V9h13v7" />
      <path d="M15 12h4l3 2.2V16h-7" />
      <circle cx="6" cy="18" r="1.75" />
      <circle cx="18" cy="18" r="1.75" />
      <path d="M2 9V6h6v3" />
    </svg>
  )
}

export function CompassIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  )
}

export function LinkIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.6 4.9a3.5 3.5 0 0 1 5 5L16 11.5" />
      <path d="M13 17.5 11.4 19.1a3.5 3.5 0 0 1-5-5L8 12.5" />
    </svg>
  )
}

export function AnchorIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v14" />
      <path d="M5 12H2a10 10 0 0 0 10 9 10 10 0 0 0 10-9h-3" />
      <path d="M8 9H4M20 9h-4" />
    </svg>
  )
}

export function BuildingIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3" width="10" height="18" rx="1" />
      <path d="M14 8h6v13h-6" />
      <path d="M7.5 7h3M7.5 10.5h3M7.5 14h3M7.5 17.5h3" />
    </svg>
  )
}

export function UsersIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6" />
      <path d="M16 5.2c1.3.4 2.25 1.6 2.25 3s-.95 2.6-2.25 3" />
      <path d="M18.5 14.3c2 .6 3.5 2.7 3.5 5.2" />
    </svg>
  )
}

export function CoinsIcon(props) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="9" cy="7" rx="6" ry="3" />
      <path d="M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7" />
      <path d="M3 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" />
      <path d="M15 9.5c2.9.3 5 1.5 5 3s-2.1 2.7-5 3" />
    </svg>
  )
}

export function EyeIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
