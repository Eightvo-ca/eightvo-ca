import React from 'react'
import './styles.css'

const services = [
  'Advisory & strategy',
  'Digital transformation',
  'Risk & compliance',
  'Tax & assurance',
  'Private enterprise',
  'Financial services'
]

export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="topbar">
          <div className="brand" aria-label="Eightvo Solution Inc">
            <img
              src="/IMG_1789.png"
              alt="Eightvo Solution Inc logo"
              className="brand__mark"
            />
            <div className="brand__text">
              <span className="brand__name">Eightvo Solution Inc</span>
              <span className="brand__tagline">Business beyond the baseline</span>
            </div>
          </div>

          <nav className="main-nav" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#industries">Industries</a>
            <a href="#insights">Insights</a>
            <a href="#about">About</a>
          </nav>

          <div className="header-actions">
            <button className="btn ghost">Careers</button>
            <button className="btn primary">Contact us</button>
          </div>
        </div>

        <div className="service-bar" id="services">
          <div className="service-bar__label">How we help</div>
          <div className="service-bar__items">
            {services.map((service) => (
              <div key={service} className="service-pill">
                <span>{service}</span>
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="pill__chevron"
                  focusable="false"
                >
                  <path
                    d="M5.25 3.75 9.5 8l-4.25 4.25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="hero" id="about">
        <div className="hero__content">
          <p className="eyebrow" id="industries">Eightvo Solution Inc</p>
          <h1>Transforming complex challenges into confident growth</h1>
          <p className="lede" id="insights">
            Inspired by the precision of our new mark, we simplify the path from insight to action—
            pairing disciplined strategy with technology, assurance, and risk management expertise.
          </p>
          <div className="hero__actions">
            <button className="btn primary">Start a project</button>
            <button className="btn ghost">View case studies</button>
          </div>
        </div>
        <div className="hero__badge">
          <div className="hero__badge-inner">
            <span className="badge__title">Assurance-first</span>
            <p className="badge__copy">
              Rigorous governance, digital operations, and people-first change programs designed to keep you ahead.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
