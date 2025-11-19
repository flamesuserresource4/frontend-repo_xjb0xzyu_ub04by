import React, { useState } from 'react'
import Logo from './Logo'

export default function Auth({ onLogin }) {
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const API = import.meta.env.VITE_BACKEND_URL

  const requestOtp = async () => {
    if (!phone) return
    const res = await fetch(`${API}/api/auth/request-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone }) })
    if (res.ok) setOtpSent(true)
  }

  const verifyOtp = async () => {
    const res = await fetch(`${API}/api/auth/verify-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, otp, name }) })
    const data = await res.json()
    if (res.ok) {
      onLogin?.(data)
    } else {
      alert(data.detail || 'Invalid OTP')
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#F4F9F4' }}>
      <div className="max-w-md mx-auto px-6 py-10">
        <div className="flex justify-center mb-8"><Logo /></div>
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-2xl font-semibold" style={{ color: '#1A1A1A' }}>Welcome</h2>
          <p className="text-sm text-gray-500">Login or sign up with your phone</p>

          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring" />

          {otpSent && (
            <>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name (optional)" className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring" />
              <div className="flex gap-2">
                <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter OTP (1234)" className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring" />
                <button onClick={verifyOtp} className="px-5 rounded-xl text-white" style={{ background: '#2ECC71' }}>Verify</button>
              </div>
            </>
          )}

          {!otpSent && (
            <button onClick={requestOtp} className="w-full py-3 rounded-xl text-white" style={{ background: '#2ECC71' }}>Get OTP</button>
          )}

          <div className="pt-2 text-center text-sm text-gray-500">or continue with</div>
          <button className="w-full py-3 rounded-xl border">Google</button>
        </div>

        <div className="mt-8 text-center">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop" alt="illustration" className="rounded-2xl shadow" />
        </div>
      </div>
    </div>
  )
}
