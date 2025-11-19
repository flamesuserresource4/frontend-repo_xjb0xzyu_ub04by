import React, { useEffect, useState } from 'react'
import Splash from './components/Splash'
import Auth from './components/Auth'
import Home from './components/Home'
import Cart from './components/Cart'
import Address from './components/Address'
import Checkout from './components/Checkout'
import Tracking from './components/Tracking'
import Profile from './components/Profile'

const theme = {
  primary: '#2ECC71',
  secondary: '#27AE60',
  background: '#F4F9F4',
  text: '#1A1A1A'
}

function TopBar({ user, setScreen }) {
  return (
    <div className="sticky top-0 z-20 border-b" style={{ background: theme.background }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-extrabold"><span style={{ color: theme.primary }}>Veg</span><span style={{ color: theme.secondary }}>Holic</span></div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setScreen('home')} className="px-3 py-2 rounded-xl border">Home</button>
          <button onClick={()=>setScreen('cart')} className="px-3 py-2 rounded-xl border">Cart</button>
          <button onClick={()=>setScreen('address')} className="px-3 py-2 rounded-xl border">Address</button>
          <button onClick={()=>setScreen('checkout')} className="px-3 py-2 rounded-xl border">Checkout</button>
          <button onClick={()=>setScreen('profile')} className="px-3 py-2 rounded-xl border">Profile</button>
        </div>
        <div className="text-sm text-gray-600">{user?`Hi, ${user.user_id.slice(-4)}`:'Guest'}</div>
      </div>
    </div>
  )
}

function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [user, setUser] = useState(null)
  const [screen, setScreen] = useState('home')
  const [lastOrder, setLastOrder] = useState('')

  useEffect(() => {
    const u = localStorage.getItem('vh_user')
    if (u) setUser(JSON.parse(u))
  }, [])

  const handleLogin = (data) => {
    setUser(data)
    localStorage.setItem('vh_user', JSON.stringify(data))
    setScreen('home')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vh_user')
    setScreen('home')
  }

  if (!splashDone) return <Splash onDone={() => setSplashDone(true)} />

  if (!user) return <Auth onLogin={handleLogin} />

  return (
    <div style={{ background: theme.background, color: theme.text }} className="min-h-screen">
      <TopBar user={user} setScreen={setScreen} />
      {screen==='home' && <Home user={user} />}
      {screen==='cart' && <Cart user={user} />}
      {screen==='address' && <Address user={user} onContinue={()=>setScreen('checkout')} />}
      {screen==='checkout' && <Checkout user={user} />}
      {screen==='tracking' && <Tracking orderId={lastOrder} />}
      {screen==='profile' && <Profile user={user} onLogout={logout} />}
    </div>
  )
}

export default App
