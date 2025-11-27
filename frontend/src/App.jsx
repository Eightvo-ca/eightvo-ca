import React from 'react'

const services = [
  {
    title: 'Web Experiences',
    description:
      'Design-first web applications that balance beautiful interfaces with measurable conversions.',
    tags: ['UX Strategy', 'Design Systems', 'High-performance builds'],
  },
  {
    title: 'Cyber Resilience',
    description:
      'Security-first delivery with proactive testing, hardened configurations, and vigilant monitoring.',
    tags: ['AppSec Reviews', 'Pen Testing', 'Zero Trust by design'],
  },
  {
    title: 'Full-Stack Delivery',
    description:
      'Product-minded engineers who translate ideas into reliable, scalable releases.',
    tags: ['API Design', 'Microservices', 'Data Engineering'],
  },
  {
    title: 'DevOps & Reliability',
    description:
      'Automation that keeps releases flowing and platforms healthy around the clock.',
    tags: ['CI/CD', 'Observability', 'Cloud Infrastructure'],
  },
]

const highlights = [
  {
    title: 'Embedded squads',
    detail: 'Flexible engagement models that slot seamlessly into your roadmap.',
  },
  {
    title: 'Production-grade support',
    detail: 'Proactive maintenance, instrumentation, and rapid incident response.',
  },
  {
    title: 'Technical leadership',
    detail: 'Architects and leads who keep standards high and delivery predictable.',
  },
]

const portfolio = [
  {
    title: 'Secure commerce platform',
    summary: 'Hardened checkout flows and observability that cut mean-time-to-detect on incidents.',
  },
  {
    title: 'Realtime collaboration suite',
    summary: 'Web and mobile surfaces backed by low-latency APIs and resilient cloud automation.',
  },
  {
    title: 'Data-rich executive dashboards',
    summary: 'Actionable analytics with clarity-first visual design and robust data pipelines.',
  },
]

function Pill({ children }) {
  return <span className="pill">{children}</span>
}

export default function App() {
  return (
    <div className="page">
      <div className="bg-accent" aria-hidden="true" />
      <header className="hero">
        <div className="logo-row">
          <img
            src="/logo.png"
            alt="Company logo"
            className="logo"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div>
            <p className="eyebrow">eightVo — engineering studio</p>
            <h1>Technical partners for outcomes that matter</h1>
            <p className="lede">
              We are a multidisciplinary team of web developers, security specialists, full-stack engineers, and
              DevOps pros who build, secure, and support the digital products that power modern businesses.
            </p>
          </div>
        </div>
        <div className="cta-row">
          <a className="btn primary" href="mailto:hello@eightvo.com">Start a project</a>
          <a className="btn ghost" href="#services">Explore our services</a>
        </div>
        <div className="trust-box">
          <p>
            We deliver product-caliber experiences with enterprise rigor—strategy, design, delivery, and long-term
            support under one roof.
          </p>
          <div className="pill-row">
            <Pill>Web Development</Pill>
            <Pill>Cyber Security</Pill>
            <Pill>Full Stack</Pill>
            <Pill>DevOps</Pill>
            <Pill>Support &amp; Maintenance</Pill>
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="services">
          <div className="section-header">
            <p className="eyebrow">What we do</p>
            <h2>Craft, secure, and accelerate every layer of your product</h2>
            <p className="section-lede">
              From the first sketch to the thousandth deploy, we build reliable systems, beautiful interfaces, and
              security-first foundations that earn customer trust.
            </p>
          </div>
          <div className="grid">
            {services.map((service) => (
              <article className="card" key={service.title}>
                <div className="card-header">
                  <div className="icon-dot" aria-hidden="true" />
                  <h3>{service.title}</h3>
                </div>
                <p className="muted">{service.description}</p>
                <div className="pill-row">
                  {service.tags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section contrast">
          <div className="section-header">
            <p className="eyebrow">How we work</p>
            <h2>Delivery shaped around your roadmap</h2>
            <p className="section-lede">
              Dedicated experts who stay close to your goals—leading architecture, shipping features, and guarding
              uptime with reliable support.
            </p>
          </div>
          <div className="grid highlights">
            {highlights.map((item) => (
              <article className="card soft" key={item.title}>
                <h3>{item.title}</h3>
                <p className="muted">{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="timeline">
            <div className="lane">
              <span className="lane-dot" aria-hidden="true" />
              <div>
                <h4>Discover &amp; plan</h4>
                <p className="muted">
                  Workshops to align on outcomes, risks, and metrics. Clear roadmaps, technical choices, and security
                  considerations from day one.
                </p>
              </div>
            </div>
            <div className="lane">
              <span className="lane-dot" aria-hidden="true" />
              <div>
                <h4>Build &amp; secure</h4>
                <p className="muted">
                  Cross-functional teams deliver features with automated testing, hardened pipelines, and observability
                  baked in.
                </p>
              </div>
            </div>
            <div className="lane">
              <span className="lane-dot" aria-hidden="true" />
              <div>
                <h4>Launch &amp; support</h4>
                <p className="muted">
                  Steady releases, proactive maintenance, and responsive incident handling keep your platform healthy as
                  you scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="portfolio">
          <div className="section-header">
            <p className="eyebrow">Recent work</p>
            <h2>Outcomes we love to deliver</h2>
            <p className="section-lede">
              A glimpse of the challenges we solve for ambitious teams—designed to convert, engineered to endure.
            </p>
          </div>
          <div className="grid portfolio">
            {portfolio.map((item) => (
              <article className="card" key={item.title}>
                <div className="card-header">
                  <div className="icon-dot" aria-hidden="true" />
                  <h3>{item.title}</h3>
                </div>
                <p className="muted">{item.summary}</p>
                <a className="link" href="mailto:hello@eightvo.com">
                  Discuss a similar build →
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <p className="eyebrow">Let us help</p>
          <h2>Ready for reliable engineering partners?</h2>
          <p className="section-lede">
            Tell us about your product, platform, or security goals. We will pair you with the right specialists and
            start fast.
          </p>
        </div>
        <div className="cta-row">
          <a className="btn primary" href="mailto:hello@eightvo.com">Book a call</a>
          <a className="btn ghost" href="#portfolio">See outcomes</a>
        </div>
      </footer>
    </div>
  )
}
