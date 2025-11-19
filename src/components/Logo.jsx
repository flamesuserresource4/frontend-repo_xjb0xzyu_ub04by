import React from 'react'

export default function Logo({ size = 56 }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="relative"
        style={{ width: size, height: size }}
        aria-label="VegHolic logo"
      >
        <svg viewBox="0 0 64 64" width={size} height={size}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2ECC71" />
              <stop offset="100%" stopColor="#27AE60" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#g)" strokeWidth="3" strokeLinecap="round">
            <path d="M10 40 h40" />
            <circle cx="20" cy="46" r="5" fill="#2ECC71" stroke="none" />
            <circle cx="44" cy="46" r="5" fill="#27AE60" stroke="none" />
            <path d="M16 36 c0-8 6-14 14-14 h10" stroke="#2ECC71" />
            <path d="M40 22 c4-6 8-8 12-8" stroke="#27AE60" />
          </g>
        </svg>
      </div>
      <div className="font-extrabold text-2xl" style={{ color: '#1A1A1A' }}>
        <span style={{ color: '#2ECC71' }}>Veg</span>
        <span style={{ color: '#27AE60' }}>Holic</span>
      </div>
    </div>
  )
}
