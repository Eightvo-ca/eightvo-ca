import React from 'react'

const highlightPoints = [
  'Enterprise-ready architecture',
  'Privacy-first analytics',
  'Concierge onboarding & support',
]

const featureTiles = [
  {
    title: 'No-code orchestration',
    description:
      'Launch smart, multi-channel experiences without touching a line of code. Templates, guardrails, and automation included.',
  },
  {
    title: 'Adaptive intelligence',
    description:
      'Your data fuels tailored journeys that continuously improve conversion, loyalty, and retention.',
  },
  {
    title: 'Human in the loop',
    description:
      'Blend automation with curated, human-crafted interventions to keep every interaction on-brand.',
  },
  {
    title: 'Live observability',
    description:
      'A unified, real-time command center that shows impact, trends, and the next best move.',
  },
]

const stats = [
  { label: 'Avg. conversion lift', value: '37%' },
  { label: 'Time to first value', value: '14 days' },
  { label: 'Customer NPS', value: '72' },
]

const steps = [
  {
    title: 'Discover',
    copy: 'Connect your stack in minutes with secure, guided setup and instant data validation.',
  },
  {
    title: 'Design',
    copy: 'Drag, drop, and approve experiences that adapt automatically to your customers.',
  },
  {
    title: 'Launch',
    copy: 'Ship with confidence, backed by observability, alerts, and a dedicated partner.',
  },
]

export default function App() {
  return (
    <div className="page">
      <div className="orb orb-left" aria-hidden />
      <div className="orb orb-right" aria-hidden />
      <header className="nav">
        <div className="brand">
          <div className="brand-mark">8</div>
          <span>eightVo</span>
        </div>
        <div className="nav-actions">
          <a className="ghost" href="#features">Platform</a>
          <a className="ghost" href="#journey">How it works</a>
          <button className="primary">Request access</button>
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <div>
            <p className="eyebrow">Customer experience, elevated</p>
            <h1>
              Build remarkable journeys
              <span className="accent"> without starting from zero.</span>
            </h1>
            <p className="lede">
              eightVo combines human creativity with adaptive intelligence so every touchpoint feels bespoke, intentional, and always on brand.
            </p>
            <div className="cta-row">
              <button className="primary">Book a walkthrough</button>
              <button className="secondary">Explore the playbook</button>
            </div>
            <div className="highlight-list">
              {highlightPoints.map((point) => (
                <div key={point} className="pill">
                  <span className="dot" />
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card">
            <div className="card-header">
              <div>
                <p className="card-eyebrow">Experience quality</p>
                <h3>Live performance</h3>
              </div>
              <div className="status">Live</div>
            </div>
            <div className="chart">
              <div className="chart-line" />
              <div className="chart-blip" style={{ left: '12%' }} />
              <div className="chart-blip" style={{ left: '42%' }} />
              <div className="chart-blip" style={{ left: '74%' }} />
            </div>
            <div className="stat-grid">
              {stats.map((item) => (
                <div key={item.label} className="stat">
                  <p className="stat-label">{item.label}</p>
                  <p className="stat-value">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="badge">Secure • SOC2 • SSO</div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="section-heading">
            <p className="eyebrow">Platform</p>
            <h2>Everything you need to ship world-class experiences</h2>
            <p className="lede">Purpose-built for modern teams who want momentum without compromising governance or craft.</p>
          </div>
          <div className="feature-grid">
            {featureTiles.map((feature) => (
              <article key={feature.title} className="feature">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <button className="text-button">See details →</button>
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className="section">
          <div className="section-heading center">
            <p className="eyebrow">Launch with confidence</p>
            <h2>From idea to impact in three steps</h2>
            <p className="lede">Pair our team with yours to move fast, stay compliant, and delight customers from day one.</p>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <div key={step.title} className="step">
                <div className="step-number">0{index + 1}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2>Let&apos;s craft your signature experience</h2>
            <p className="lede">Tell us about your goals—we&apos;ll tailor a private demo with real scenarios from your industry.</p>
          </div>
          <div className="cta-actions">
            <button className="primary">Schedule time</button>
            <button className="secondary">Talk to product</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand">
          <div className="brand-mark">8</div>
          <span>eightVo</span>
        </div>
        <p className="footnote">Built for teams who care about every detail. © {new Date().getFullYear()} eightVo.</p>
      </footer>
    </div>
  )
}
