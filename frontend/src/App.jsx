import React from 'react'

const services = [
  {
    title: 'Product Engineering',
    description: 'Modern web and cloud systems tailored to your roadmap with an emphasis on scalability and maintainability.',
    tag: 'Full-stack delivery'
  },
  {
    title: 'Data & AI Enablement',
    description: 'Dashboards, analytics pipelines, and pragmatic AI integrations that accelerate decision-making.',
    tag: 'Insights that ship'
  },
  {
    title: 'Cloud & DevOps',
    description: 'Azure-native infrastructure, CI/CD, and observability so releases are boring and reliable.',
    tag: 'Built for uptime'
  }
]

const highlights = [
  {
    label: '8+ years',
    detail: 'Shipping production systems in healthcare, fintech, and public sector.'
  },
  {
    label: 'Cloud-first',
    detail: 'Deep Azure expertise with security and compliance top of mind.'
  },
  {
    label: 'Delivery partner',
    detail: 'Workshops, training, and embedded teams to move faster together.'
  }
]

const trainings = [
  {
    title: 'Architecture Accelerator',
    audience: 'Technical leads',
    format: '2-week intensive • Remote or onsite',
    outcome: 'Reference architectures, guardrails, and a delivery playbook tailored to your org.'
  },
  {
    title: 'AI for Delivery Teams',
    audience: 'Developers & PMs',
    format: 'Hands-on labs • Tooling included',
    outcome: 'Ship responsibly with prompts, evals, and production-readiness baked in.'
  }
]

const portfolio = [
  'Migration of a national health portal to Azure with zero downtime and 30% latency reduction.',
  'Built a training booking platform with secure file handling and automated confirmations.',
  'Launched a careers portal with streamlined applicant intake and review workflows.'
]

const engagement = [
  {
    title: 'Embedded delivery',
    detail: 'Hands-on engineers and architects who pair with your team to ship features and level up practices.'
  },
  {
    title: 'Advisory + audits',
    detail: 'Architecture reviews, security checks, and cloud cost tuning with prioritized recommendations.'
  },
  {
    title: 'Build, transfer, handoff',
    detail: 'We stand up the first release, document everything, and train your team so you own the runway.'
  }
]

const roles = [
  {
    title: 'Full-stack Engineer (Contract)',
    location: 'Remote within Canada',
    focus: 'React, Node.js/Express, Azure PaaS, and CI/CD. Experience with RBAC and secure file flows a plus.'
  },
  {
    title: 'DevOps Specialist',
    location: 'Remote / Hybrid Toronto',
    focus: 'Azure pipelines, container workloads, IaC, monitoring/alerts, and release governance.'
  },
  {
    title: 'Training Facilitator',
    location: 'Remote',
    focus: 'Design and deliver workshops on architecture, AI enablement, and operational excellence.'
  }
]

export default function App() {
  return (
    <div className="page">
      <div className="gradient" aria-hidden="true" />
      <header className="nav">
        <div className="logo-mark">eightVo</div>
        <nav className="nav-links" aria-label="Primary">
          <a href="#services">Services</a>
          <a href="#training">Training</a>
          <a href="#portfolio">Portfolio</a>
          <a className="cta" href="#contact">Book a call</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="pill">Full-stack delivery • Azure • AI</p>
            <h1>Engineering that turns strategy into shipped product.</h1>
            <p className="lede">
              eightVo Solutions partners with teams to design, build, and operate modern platforms—
              from public-facing experiences to secure, role-based applications.
            </p>
            <div className="hero-actions">
              <a className="primary" href="#contact">Start a project</a>
              <a className="ghost" href="#portfolio">View recent work</a>
            </div>
            <div className="hero-grid">
              {highlights.map((item) => (
                <article key={item.label} className="highlight">
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="hero-card" role="presentation">
            <p className="eyebrow">Delivery snapshot</p>
            <h3>Public site + training portal</h3>
            <ul>
              <li>Responsive marketing pages with SEO foundations</li>
              <li>Secure sign-up with role approvals</li>
              <li>Training catalog, session booking, and resource access</li>
              <li>Careers hub with streamlined applicant intake</li>
            </ul>
            <div className="status">Currently accepting Q2 builds</div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-header">
            <p className="eyebrow">Services</p>
            <h2>Specialized help that meets you where you are.</h2>
            <p className="lede">
              Whether you need a rapid MVP, an enterprise rollout, or a cloud modernization, we tailor the
              engagement to your goals and timelines.
            </p>
          </div>
          <div className="cards">
            {services.map((service) => (
              <article key={service.title} className="card">
                <div className="tag">{service.tag}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="training" className="section split">
          <div className="section-header">
            <p className="eyebrow">Professional training</p>
            <h2>Hands-on programs that move teams forward.</h2>
            <p className="lede">
              Live sessions, tailored materials, and post-session artifacts so your teams can put learnings
              into production immediately.
            </p>
            <a className="secondary" href="#contact">Book a workshop</a>
          </div>
          <div className="stack">
            {trainings.map((item) => (
              <article key={item.title} className="card outline">
                <div className="tag subtle">{item.audience}</div>
                <h3>{item.title}</h3>
                <p className="meta">{item.format}</p>
                <p>{item.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="section">
          <div className="section-header">
            <p className="eyebrow">Recent impact</p>
            <h2>Proof in shipped outcomes.</h2>
            <p className="lede">Highlights from delivery, training, and operational engagements.</p>
          </div>
          <div className="list">
            {portfolio.map((item, idx) => (
              <article key={idx} className="list-item">
                <span className="bullet" aria-hidden="true">◆</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section alt">
          <div className="section-header">
            <p className="eyebrow">How we engage</p>
            <h2>Flexible models built around your roadmap.</h2>
            <p className="lede">
              Choose the working style that fits your team and phase. We join as partners, not vendors.
            </p>
          </div>
          <div className="cards three-up">
            {engagement.map((item) => (
              <article key={item.title} className="card outline">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="careers" className="section careers">
          <div className="section-header">
            <p className="eyebrow">Careers</p>
            <h2>Join the delivery bench.</h2>
            <p className="lede">
              We work with specialists who love crisp requirements, reliable releases, and pragmatic cloud choices.
            </p>
          </div>
          <div className="roles">
            {roles.map((role) => (
              <article key={role.title} className="role-card">
                <div className="role-top">
                  <h3>{role.title}</h3>
                  <span className="tag subtle">{role.location}</span>
                </div>
                <p>{role.focus}</p>
                <a className="secondary" href="#contact">Express interest</a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="contact-card">
            <p className="eyebrow">Let’s build</p>
            <h2>Ready to talk about your roadmap?</h2>
            <p className="lede">
              Tell us about your goals, timelines, and the outcomes you need. We’ll respond with a concise
              plan, resourcing options, and next steps within one business day.
            </p>
            <div className="cta-row">
              <a className="primary" href="mailto:hello@eightvo.ca">hello@eightvo.ca</a>
              <a className="ghost" href="https://cal.com" target="_blank" rel="noreferrer">Schedule a call</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>© {new Date().getFullYear()} eightVo Solutions Inc.</div>
        <div className="footer-links">
          <span>Azure-first delivery</span>
          <span>Privacy-first by design</span>
          <span>Based in Canada</span>
        </div>
      </footer>
    </div>
  )
}
