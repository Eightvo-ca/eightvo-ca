import React from 'react'
import logo from './assets/logo.svg'

const highlightPoints = [
  'Enterprise-grade security and privacy',
  'Dedicated concierge onboarding',
  'Human + AI orchestration that stays on-brand',
]

const featureTiles = [
  {
    title: 'No-code journeys',
    description:
      'Design adaptive, multi-channel experiences with drag-and-drop ease and built-in guardrails.',
  },
  {
    title: 'Signals that learn',
    description:
      'Blend behavioral data with qualitative signals to refine every touchpoint continuously.',
  },
  {
    title: 'Operational clarity',
    description:
      'Observability, approvals, and playbooks that keep teams aligned and accountable.',
  },
  {
    title: 'Enterprise ready',
    description:
      'SSO, SOC2, RBAC, and audit-friendly controls baked into the platform.',
  },
]

const stats = [
  { label: 'Conversion lift', value: '37%' },
  { label: 'Time to first value', value: '14 days' },
  { label: 'Customer NPS', value: '72' },
]

const steps = [
  {
    title: 'Discover',
    copy: 'Connect your stack securely with guided setup, validation, and a real-time readiness report.',
  },
  {
    title: 'Design',
    copy: 'Co-create golden-path journeys with our team while AI refines the micro-moments.',
  },
  {
    title: 'Launch',
    copy: 'Ship confidently with live observability, alerts, and a partner who stays in the loop.',
  },
]

export default function App() {
  return (
    <div className="page">
      <div className="orb orb-left" aria-hidden />
      <div className="orb orb-right" aria-hidden />
      <header className="nav">
        <div className="brand">
          <div className="logo-mark">
            <img src={logo} alt="eightVo logo" />
          </div>
          <span>eightVo</span>
        </div>
        <div className="nav-actions">
          <a className="ghost" href="#features">
            Platform
          </a>
          <a className="ghost" href="#journey">
            How it works
          </a>
          <button className="primary">Request access</button>
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Customer experience, elevated</p>
            <h1>
              Build signature journeys that feel bespoke
              <span className="accent"> for every customer.</span>
            </h1>
            <p className="lede">
              eightVo brings your brand to life with orchestration that blends human care, adaptive intelligence, and
              uncompromising governance—all wrapped in a premium, gold-accented experience.
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
            <div className="badge">
              <div className="badge-logo">
                <img src={logo} alt="eightVo badge" />
              </div>
              Secure • SOC2 • SSO
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="section-heading">
            <p className="eyebrow">Platform</p>
            <h2>Everything you need to ship world-class experiences</h2>
            <p className="lede">
              Purpose-built for modern teams who want momentum without compromising governance or craft.
            </p>
          </div>
          <div className="feature-grid">
            {featureTiles.map((feature) => (
              <article key={feature.title} className="feature">
                <div className="feature-top">
                  <div className="feature-icon" aria-hidden>
                    <span />
                  </div>
                  <h3>{feature.title}</h3>
                </div>
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
            <p className="lede">
              Pair our team with yours to move fast, stay compliant, and delight customers from day one.
            </p>
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
            <p className="lede">
              Tell us about your goals—we&apos;ll tailor a private demo with real scenarios from your industry.
            </p>
          </div>
          <div className="cta-actions">
            <button className="primary">Schedule time</button>
            <button className="secondary">Talk to product</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand">
          <div className="logo-mark">
            <img src={logo} alt="eightVo logo" />
          </div>
          <span>eightVo</span>
        </div>
        <p className="footnote">Built for teams who care about every detail. © {new Date().getFullYear()} eightVo.</p>
      </footer>
    </div>
  )
}
