# eightVo Solutions Inc — eightvo.ca

Welcome to the eightvo.ca project repository. This README documents the initial product vision, functional and non-functional requirements, architecture and deployment guidance, security and operational considerations, developer setup instructions, and next steps for building the public website + application for eightVo Solutions Inc.

Table of contents
- Project overview
- Business goals & target users
- Product features (high level)
- User roles & access control
- User stories & acceptance criteria
- Data model (high level)
- Public API endpoints (initial)
- Suggested tech stack & architecture
- Deployment & DNS (Azure + GoDaddy)
- Environment variables & secrets
- Local development & running the app
- CI/CD (GitHub Actions) & Azure deployment options
- Security, privacy & compliance
- Monitoring, logging & backups
- Project roadmap and next steps
- Contacts

Project overview
eightVo Solutions Inc provides three primary services via eightvo.ca:
1. Marketing/Services website to showcase technical expertise, tech stacks, portfolio and attract clients for freelance/project work.
2. Professional training services (one-on-one and group sessions) with booking/registration.
3. Careers portal for job postings and candidate applications.

Additionally, the application contains a gated area where authenticated users can access service-specific content. Admin users control user access and approve/assign roles.

Business goals & target users
- Business goals:
  - Attract clients for freelance/project work.
  - Offer paid professional training and manage bookings.
  - Hire talent via a careers portal.
  - Provide an admin interface to manage content, users and access.
- Primary users:
  - Prospective clients (anonymous visitors) — see public marketing content.
  - Registered customers / trainees — sign up, browse services, enroll in training, view course materials.
  - Job applicants — browse and apply for open roles.
  - Admins / internal staff — manage site content, projects, trainings, user access, and hires.

Product features (high level)
- Public marketing website:
  - Home, About, Services, Tech stack, Portfolio / Case Studies, Testimonials, Contact.
  - Responsive, SEO friendly, fast performance.
- Training platform:
  - Catalog of training offerings (one-on-one, group).
  - Course pages with curriculum, schedule, pricing.
  - Booking and payments (integrate Stripe/PayPal) — optional at MVP for manual payment handling.
  - Trainee dashboard (enrolled courses, session materials).
- Projects & Services:
  - Showcase completed projects (case studies) and list available service packages.
  - Contact / Request quote form.
- Careers:
  - Job listing pages with application form (file uploads for CV).
  - Admin review panel for applicants.
- Authentication & RBAC:
  - Sign up / sign in (email/password, social logins optional).
  - Roles: super-admin, admin, staff, client/trainee.
  - Admins control user provisioning and access to service pages.
- Admin dashboard:
  - Manage users, training sessions, job postings, portfolio items, and content.
- Audit & activity logs for admin actions.

User roles & access control
- Role definitions:
  - super-admin: full access, repo deploy/admin settings.
  - admin: manage content, users, trainings, jobs, publish changes.
  - staff: manage training content and delivery tasks (limited admin).
  - client/trainee: access gated resources after approval.
  - anonymous: public website access only.
- Access flow:
  - Only admins can grant role access to users or approve registration requests.
  - Registration can be self-service with “pending” status until admin approval, or invite-only.

User stories & acceptance criteria (examples)
- As a visitor, I want to view service offerings so I can evaluate whether to contact eightVo.
  - Acceptance: Home/Services/Portfolio pages render and are SEO-optimized.
- As a prospective trainee, I want to sign up for a one-on-one training session.
  - Acceptance: Sign-up flow creates user, pending approval; once approved, user can book sessions.
- As an admin, I want to approve new users and assign them the client or trainee role.
  - Acceptance: Admin dashboard shows pending users and allows role assignment.
- As a recruiter, I want to post jobs and receive applications.
  - Acceptance: Job posts visible publicly; applications stored and downloadable by admin.

Data model (high level)
- users: id, name, email (unique), password_hash, role, status (active/pending/blocked), profile, created_at, updated_at
- projects (portfolio): id, title, description, tech_stack[], images[], client_testimonials[], published, created_at
- trainings: id, title, description, type (one-on-one/group), price, schedule[], seats, materials[]
- bookings/sessions: id, training_id, user_id, status (booked/confirmed/completed), scheduled_at, notes
- jobs: id, title, description, location, type (FT/Contract), posted_at, closing_at, applications[]
- applications: id, job_id, user_id, resume_url, cover_letter, status
- audit_logs: id, user_id, action, target, timestamp, metadata

Public API endpoints (initial)
- GET /api/health — health check
- POST /api/auth/signup — user registration
- POST /api/auth/login — login (returns JWT)
- GET /api/public/services — list services
- GET /api/public/projects — list portfolio items
- GET /api/trainings — list trainings (public view)
- POST /api/bookings — create a booking (protected)
- GET /api/admin/users — list users (admin only)
- POST /api/admin/users/:id/roles — assign roles (admin only)
- GET /api/jobs — list jobs
- POST /api/jobs/:id/apply — apply for job (file upload)

Suggested tech stack & architecture
- Frontend: React (Vite) or Next.js (if SSR/SEO required); static or hybrid rendering.
- Backend: Node.js + Express or NestJS — RESTful API, authentication, admin routes.
- Database: PostgreSQL (recommended) or MongoDB (if more flexible schema needed).
- Auth: JWT for API; session-based or JWT for admin. Consider Auth0/Azure AD B2C for enterprise-grade auth.
- Storage: Azure Blob Storage (images, resumes, materials).
- Cache: Redis (session store, rate-limiting).
- Payments: Stripe (if immediate paid booking).
- Containerization: Dockerfile included for container deployments.
- Hosting: Azure App Service or Azure Container Instances / Azure Kubernetes Service for scale.
- CI/CD: GitHub Actions deploying to Azure Web App via publish profile or service principal.

Deployment & DNS (Azure + GoDaddy)
- Basic flow for Azure App Service:
  - Create Azure Resource Group -> App Service Plan -> Web App (Linux, Node 18).
  - Deploy via GitHub Actions using a publish profile or service principal.
  - Set required app settings (NODE_ENV, DATABASE_URL, JWT_SECRET) in App Service Configuration.
- DNS mapping (GoDaddy):
  - For a root domain (eightvo.ca) you can configure an A record to Azure IP + verify, or use an A record + CNAME for www.
  - Azure typically recommends pointing www CNAME to <your-app>.azurewebsites.net and configuring root domain via A record and TXT verification.
  - After domain mapping in Azure, enable TLS (App Service Managed Certificate or bring your own).
- Recommended: Use www -> CNAME and redirect root domain to www via forwarding if easier.

Environment variables & secrets (examples)
- NODE_ENV=production
- PORT=8080
- DATABASE_URL=postgres://user:pass@host:5432/dbname
- JWT_SECRET=changeme-very-secret
- SESSION_SECRET=changeme
- AZURE_BLOB_CONNECTION_STRING=
- AZURE_WEBAPP_NAME (for CI)
- AZURE_WEBAPP_PUBLISH_PROFILE (for CI) or AZURE_CREDENTIALS (service principal JSON)
- STRIPE_SECRET_KEY (if payments)
- SENDGRID_API_KEY (for transactional emails)
Store all secrets in GitHub Repository Secrets or Azure Key Vault.

Local development & running the app
- Prereqs: Node 18+, npm, Docker (optional), and a local Postgres if needed.
- Install:
  - npm ci
- Run in dev:
  - npm run dev
- Run with Docker:
  - docker build -t eightvo-ca .
  - docker run -p 8080:8080 -e NODE_ENV=development -e PORT=8080 eightvo-ca

CI/CD & GitHub Actions (initial)
- A sample workflow is included (.github/workflows/azure-webapp-deploy.yml) that:
  - Installs Node, runs build, and uses azure/webapps-deploy action with publish profile.
- Secrets to add:
  - AZURE_WEBAPP_PUBLISH_PROFILE (publish profile XML from Azure Portal)
  - AZURE_WEBAPP_NAME
  - DATABASE_URL, JWT_SECRET, other runtime secrets as needed.

Security, privacy & compliance
- Use HTTPS everywhere and enforce HSTS.
- Secure cookies and use HttpOnly and SameSite flags.
- Hash passwords with bcrypt/argon2.
- Use rate limiting and input validation on all endpoints.
- CSRF protections on form routes if session-based auth is used.
- Store PII minimally and purge old data per your privacy policy.
- Consider GDPR and local privacy laws for candidate data and trainee information.
- Use Azure Key Vault for high-value secrets and rotate them periodically.

Monitoring, logging & backups
- App Insights (Azure) for application telemetry and error tracking.
- Centralized logs using Azure Monitor or a log aggregator.
- Regular backups of PostgreSQL (managed service) and blob storage.
- Setup alerts for downtime, high error rates, and high latency.

Project roadmap and next steps (initial sprint)
- Sprint 0 (setup):
  - Create repository and initial scaffold (Node.js + Express + static front).
  - Setup basic CI/CD to Azure with publish profile.
  - Configure domain mapping for eightvo.ca (GoDaddy -> Azure).
- Sprint 1 (MVP public site):
  - Implement marketing pages (Home, Services, Tech Stacks, Portfolio).
  - Create admin CMS basics to manage content.
- Sprint 2 (training + bookings):
  - Implement trainings catalog and booking flows.
  - Integrate email notifications.
- Sprint 3 (careers):
  - Add job posting and application management.
- Ongoing:
  - Add payments, analytics, search, SEO improvements, performance tuning.

Acceptance checklist before launch
- [ ] Production App Service deployed and healthy
- [ ] Custom domain eightvo.ca mapped and TLS enabled
- [ ] Basic content (Home, Services, Portfolio, Contact)
- [ ] Admin user(s) created and tested user approval flow
- [ ] Backups and monitoring configured
- [ ] Security review completed (password storage, secrets, HTTPS)

Contacts
- Admin / Owner: (you — update with contact email)
- Repo owner: mk74936 (GitHub)
- Domain registrar: GoDaddy (domain: eightvo.ca)

License
- Add an appropriate LICENSE file for your company code (MIT/Proprietary).

Contributing
- Create issues for features/bugs in GitHub.
- Follow branching: main (production), develop (staging), feature/* branches.
- Use PRs and require at least one review before merging to main.

Notes
This README is intended to be a living document — update as requirements evolve. If you’d like, I can generate an initial issue list, file scaffold (frontend + backend), GitHub Actions workflows, and example Azure resource templates (ARM/Bicep/Terraform). Tell me which you'd like next: create repo and push scaffold, or produce infra-as-code to provision Azure resources automatically.

Thank you — ready when you are to generate the repo and initial codebase.