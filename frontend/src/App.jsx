import React from 'react'

export default function App() {
  return (
    <div style={{fontFamily: 'Arial, sans-serif', padding: 24}}>
      <header style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <img
          src="/IMG_1789.png"
          alt="eightVo logo"
          style={{height: 64, display: 'block'}}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <h1 style={{margin: 0}}>eightVo — Welcome</h1>
      </header>

      <p>Minimal frontend scaffold (Vite + React).</p>
      <p>Try the API health check: <code>/api/health</code></p>

      <p style={{color: '#666', marginTop: 24}}>
        To use your logo, copy the file <code>IMG_1789.png</code> into
        <code> frontend/public/</code> so it is available at <code>/IMG_1789.png</code>.
      </p>
    </div>
  )
}
