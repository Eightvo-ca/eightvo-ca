import React from 'react'

const services = [
  {
    title: 'Cyber Security',
    summary:
      'Protect what matters, reduce risk, and build trust without adding unnecessary complexity or disruption.',
  },
  {
    title: 'AI & ML Solutions',
    summary:
      'Turn intelligent insights into better planning, forecasting, and decisions that reflect real business priorities.',
  },
  {
    title: 'Web & Digital Applications',
    summary:
      'Design digital experiences that reach customers, streamline operations, and support sustainable growth.',
  },
]

const audience = [
  {
    title: 'For Small Businesses',
    benefits: [
      'Improve operations and service quality using the data you already collect.',
      'Automate repetitive work so teams focus on what matters most.',
      'Reach more customers through purposeful digital experiences.',
      'Make confident decisions backed by clear, timely insights.',
    ],
    result: 'Grow smarter, spend wisely, and compete with larger players — without guessing.',
  },
  {
    title: 'For Public & Community Initiatives',
    benefits: [
      'Improve service delivery and community engagement.',
      'Use data to plan and allocate resources where they are needed most.',
      'Upskill the local workforce with practical, hands-on knowledge.',
      'Support digital growth for small and medium businesses in the region.',
    ],
    result: 'Stronger local businesses, skilled jobs, and long-term digital capability.',
  },
]

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="brand">eightVo</div>
        <div className="hero-content">
          <div className="hero-text">
            <p className="eyebrow">Clarity • Confidence • Better Decisions</p>
            <h1>Helping businesses make better decisions using the technology they already have.</h1>
            <p className="lead">
              Small businesses and local communities face rising costs, limited resources, and growing competition. Most
              know technology can help — but don’t know where to start or whom to trust. We bring clarity.
            </p>
            <p className="sub-lead">We don’t replace what’s working. We make it work better.</p>
            <div className="cta-row">
              <a className="cta primary" href="mailto:info@eightvo.ca">
                Start a Conversation
              </a>
              <a className="cta ghost" href="#contact">
                Contact Us
              </a>
            </div>
            <p className="reassurance">No obligation. Just an exploratory discussion focused on your goals.</p>
          </div>
          <div className="hero-card">
            <div className="badge">Outcome-Focused</div>
            <h3>We solve the clarity gap, not a technology gap.</h3>
            <ul>
              <li>Work on top of the systems you already trust.</li>
              <li>Unlock value hidden in your data and processes.</li>
              <li>Reduce risk and guesswork with confident decisions.</li>
            </ul>
            <a className="cta secondary" href="#solutions">
              See how we help
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="challenge">
          <div className="section-header">
            <p className="eyebrow">The Core Problem We Solve</p>
            <h2>The challenge isn’t technology — it’s clarity.</h2>
            <p className="section-lead">
              Businesses already have systems, data, and tools in place. What’s missing are clear answers and confident
              decisions.
            </p>
          </div>
          <div className="cards three">
            <article className="card">
              <h3>Data exists, but insights don’t.</h3>
              <p>Information is scattered and underused, making it hard to see the full picture.</p>
            </article>
            <article className="card">
              <h3>Systems run, but value is hidden.</h3>
              <p>Day-to-day operations work, yet growth, efficiency, and resilience stay out of reach.</p>
            </article>
            <article className="card">
              <h3>Tools are used, but outcomes are unclear.</h3>
              <p>Technology decisions feel risky without clarity on impact, cost, or time to value.</p>
            </article>
          </div>
          <div className="approach">
            <div>
              <h3>Our approach</h3>
              <p>
                We sit on top of your existing systems and make them smarter. We uncover the insights you already own
                and turn them into confident, low-risk decisions.
              </p>
            </div>
            <a className="cta primary" href="mailto:info@eightvo.ca">
              Start a Conversation
            </a>
          </div>
        </section>

        <section className="section muted" id="solutions">
          <div className="section-header">
            <p className="eyebrow">Solution Overview</p>
            <h2>How we help (without the jargon)</h2>
            <p className="section-lead">
              We sit on top of your existing systems, turning data into actionable decisions so you can move faster with
              less risk.
            </p>
          </div>
          <div className="list-grid">
            <div className="list-item">
              <span className="icon">📊</span>
              <div>
                <h3>Turn data into clear, actionable insights.</h3>
                <p>See what’s working, what’s not, and where to focus next.</p>
              </div>
            </div>
            <div className="list-item">
              <span className="icon">🎯</span>
              <div>
                <h3>Reduce guesswork in decision-making.</h3>
                <p>Align teams around confident choices backed by evidence.</p>
              </div>
            </div>
            <div className="list-item">
              <span className="icon">⚡</span>
              <div>
                <h3>Move faster with less risk.</h3>
                <p>Deliver outcomes on top of what you already use — no rip-and-replace.</p>
              </div>
            </div>
          </div>
          <p className="sub-lead center">We don’t sell technology. We unlock value from the technology you already own.</p>
        </section>

        <section className="section" id="services">
          <div className="section-header">
            <p className="eyebrow">Our Services</p>
            <h2>Our solutions — concise and outcome-focused</h2>
            <p className="section-lead">Business-led guidance with just enough detail to decide what to explore next.</p>
          </div>
          <div className="cards three">
            {services.map((service) => (
              <article className="card service-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <a className="learn-more" href="mailto:info@eightvo.ca">
                  Learn more
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section muted" id="audience">
          <div className="section-header">
            <p className="eyebrow">Who We Help</p>
            <h2>Built for decision-makers, not engineers.</h2>
            <p className="section-lead">Tailored guidance for leaders who need clarity, speed, and confidence.</p>
          </div>
          <div className="cards two">
            {audience.map((group) => (
              <article className="card" key={group.title}>
                <div className="card-header">
                  <h3>{group.title}</h3>
                </div>
                <ul className="bullet-list">
                  {group.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <p className="result">Result: {group.result}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="difference">
          <div className="section-header">
            <p className="eyebrow">Why We’re Different</p>
            <h2>We solve while we train.</h2>
            <p className="section-lead">
              We don’t just deliver solutions — we build understanding so knowledge stays within your organization.
            </p>
          </div>
          <div className="callouts">
            <div className="callout">
              <span className="icon">🤝</span>
              <div>
                <h3>Business owners stay informed.</h3>
                <p>We explain decisions in plain language so leaders know what’s happening.</p>
              </div>
            </div>
            <div className="callout">
              <span className="icon">🧭</span>
              <div>
                <h3>Teams gain hands-on skills.</h3>
                <p>Practical guidance that equips your people to operate and improve the solution.</p>
              </div>
            </div>
            <div className="callout">
              <span className="icon">🛠️</span>
              <div>
                <h3>Knowledge stays inside.</h3>
                <p>Our goal is independence — not dependency — so you keep control.</p>
              </div>
            </div>
          </div>
          <div className="cta-row center">
            <a className="cta primary" href="mailto:info@eightvo.ca">
              Talk with the team
            </a>
            <a className="cta ghost" href="#contact">
              No-pressure consultation
            </a>
          </div>
        </section>

        <section className="section muted" id="team">
          <div className="section-header">
            <p className="eyebrow">Our Team</p>
            <h2>Built by experienced practitioners.</h2>
            <p className="section-lead">
              Coaches, developers, AI and ML engineers, data specialists, and trainers — united by one purpose: solving
              real business problems and helping organizations grow sustainably.
            </p>
          </div>
          <div className="testimonial">
            <p className="quote">“We don’t replace what’s working — we make it work better.”</p>
            <p className="quote-sub">Trusted by leaders who want clarity, confidence, and outcomes.</p>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="section-header">
            <p className="eyebrow">Ready to Begin?</p>
            <h2>Let’s start a conversation.</h2>
            <p className="section-lead">
              We’re not asking for big commitments today — just a conversation about your goals, your data, and the
              decisions you need to make.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Contact Information</h3>
              <ul className="contact-list">
                <li>
                  <span>📧</span>
                  <a href="mailto:info@eightvo.ca">info@eightvo.ca</a>
                </li>
                <li>
                  <span>📞</span>
                  <div className="phone-stack">
                    <a href="tel:+14374993602">+1 437 499 3602</a>
                    <a href="tel:+14379863162">+1 437 986 3162</a>
                  </div>
                </li>
                <li>
                  <span>📍</span>
                  <span>Serving businesses and communities locally and globally</span>
                </li>
              </ul>
              <p className="reassurance">Exploratory discussion. No obligation.</p>
            </div>
            <div className="contact-card">
              <h3>What we can explore together</h3>
              <ul className="bullet-list">
                <li>Gain clarity from your data.</li>
                <li>Make better decisions with confidence.</li>
                <li>Use technology more effectively — without replacing what works.</li>
              </ul>
              <a className="cta primary" href="mailto:info@eightvo.ca">
                Contact us to explore solutions
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <p className="footer-brand">eightVo</p>
          <p className="footer-note">We unlock value from the technology you already own.</p>
        </div>
        <div className="footer-contact">
          <a href="mailto:info@eightvo.ca">info@eightvo.ca</a>
          <span>|</span>
          <div className="phone-stack">
            <a href="tel:+14374993602">+1 437 499 3602</a>
            <a href="tel:+14379863162">+1 437 986 3162</a>
          </div>
          <span>|</span>
          <span>Serving businesses and communities locally and globally</span>
        </div>
        <p className="footer-legal">© {new Date().getFullYear()} eightVo. All rights reserved.</p>
      </footer>
    </div>
  )
}
