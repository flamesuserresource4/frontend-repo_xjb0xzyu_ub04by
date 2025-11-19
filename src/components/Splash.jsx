import React, { useEffect, useState } from 'react'
import Logo from './Logo'

export default function Splash({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100
        return p + 5
      })
    }, 60)
    const done = setTimeout(() => onDone?.(), 1400)
    return () => {
      clearInterval(t)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2ECC71,#27AE60)' }}>
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center">
          <Logo size={72} />
        </div>
        <p className="text-white/90 text-lg">Freshness Delivered Fast</p>
        <div className="w-56 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
