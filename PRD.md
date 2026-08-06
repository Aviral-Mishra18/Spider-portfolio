# Product Requirements Document (PRD)
## Spider-Man Themed Developer Portfolio — "Friendly Neighborhood Developer"

**Owner:** Aviral Mishra
**Version:** 1.0
**Purpose:** Live, interactive developer portfolio built around a Spider-Man theme — designed to be unique, performant on both desktop and mobile, and professional enough for recruiter/interviewer review.

---

## 1. Overview

A multi-page developer portfolio website themed around Spider-Man, showcasing projects, skills, and resume content across dedicated routes through interactive, GPU-friendly animations. The goal is to stand out from typical portfolio templates while remaining fast, accessible, and recruiter-friendly on all devices.

### Core Principles
- **Performance first** — no feature should cause jank or hang on low-end phones.
- **Restraint over overload** — 3-4 signature "moments," not animation on every element.
- **Content > gimmick** — theme is an accent; projects/skills content is the actual deciding factor for recruiters.
- **Fast escape hatch** — a recruiter in a hurry should reach resume/projects content quickly, without being blocked by animation.

---

## 2. Goals & Success Criteria

| Goal | Success Metric |
|---|---|
| Stand out visually | At least 3 unique interactions not commonly seen in dev portfolios |
| Fast load | Lighthouse Performance score ≥ 90 on mobile |
| No hang/jank | 60fps maintained during scroll/transitions on mid-range Android (4x CPU throttle test) |
| Accessible fallback | Respects `prefers-reduced-motion`; degrades gracefully on low-end devices |
| Recruiter-friendly | Resume/Projects content reachable within 2 clicks/scrolls from landing |

---

## 3. Tech Stack (Finalized)

| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SEO, routing, fast load, image optimization |
| Scroll/Transitions | **GSAP + ScrollTrigger** | Swing-scroll motion, suit-up transitions — GPU-accelerated transforms only |
| Micro-interactions | **Framer Motion** | Hover states, button interactions, spidey-sense effects |
| Character/Vector Animation | **Rive** (preferred) or **Lottie** | Lightweight vector spider animations — no 3D/WebGL |
| Styling | **Tailwind CSS + shadcn/ui** | Utility-first styling, accessible base components |
| Live Presence | **Supabase Realtime** | WebSocket-based live visitor presence (anonymized dots) |
| Audio | **Web Audio API** | Web-shoot SFX, **muted by default**, opt-in toggle only |
| Hosting/Deployment | **Vercel** | Edge functions, global CDN, image optimization |

**Explicitly excluded:** React Three Fiber / Three.js (3D rendering) — removed due to high risk of hang/lag on low-end mobile devices and battery drain; equivalent visual impact achieved via Rive/Lottie instead.

---

## 4. Feature Requirements

### 4.1 Signature Features (Must-Have)

1. **Web-Sling Page Navigation**
   - GSAP-driven page transitions with subtle swing/arc easing when navigating between routes (not literal pendulum physics — subtle enough to not cause motion sickness).
   - Must respect `prefers-reduced-motion` → falls back to standard instant navigation.

2. **Web Cursor Interaction**
   - Custom SVG cursor; on click/hover over interactive elements (buttons, cards, links), an SVG web-line draws and "sticks," then snaps back on release.
   - Desktop only (disabled on touch devices — no cursor concept on mobile).

3. **Suit-Up Page Transitions**
   - CSS/SVG `clip-path` mask-reveal transition between major pages (Home → About → Projects → Contact).
   - Utilizes Next.js App Router template/layout animations for smooth cross-route transitions.
   - Duration capped at 400-600ms to avoid feeling slow.

4. **Live Visitor Presence**
   - Supabase Realtime channel tracks active anonymous sessions.
   - Rendered as small animated "spider dots" crawling along page edges/margins.
   - Cap at max 10 visible dots regardless of actual visitor count (aggregate extra as a counter).

### 4.2 Secondary Features (Nice-to-Have)

5. **Spidey-Sense Hover States**
   - Framer Motion hover: subtle shake + red glow pulse before click on primary CTAs/project cards.

6. **Loading Sequence**
   - Spider drawing its own web (SVG path-draw animation) revealing logo/name.
   - **Hard cap: 1.5 seconds max.** Skippable on click/tap.

7. **Day/Night Sync Background**
   - Hero background (city skyline, CSS/SVG-based, not 3D) shifts based on visitor's local time.
   - Optional weather-based rain overlay (CSS/canvas particles, capped at 20-30 particles on mobile, 100 on desktop).

8. **Web-Shoot Sound Effects**
   - Muted by default; small toggle icon (top corner) to enable.
   - Triggered only on explicit user interactions (not on scroll/hover, to avoid spam).

### 4.3 Explicitly Out of Scope (v1)
- 3D spider-man model / WebGL scenes
- Autoplay audio without user consent
- Heavy particle systems uncapped by device type
- Any feature that blocks access to Resume/Projects content

---

## 5. Performance & Technical Constraints

- **Device-aware rendering:** Use `prefers-reduced-motion` media query and basic device/viewport detection to disable/simplify animations on low-end or mobile devices.
- **Lazy loading:** All non-critical animation assets (Rive files, particle canvases) must be dynamically imported (`next/dynamic`) and loaded after initial paint.
- **Particle/animation scaling:** Particle counts and animation complexity must scale down on smaller viewports.
- **Testing requirement:** Must be tested via Chrome DevTools with 4x CPU throttling + Slow 4G network simulation before considered "done."
- **No blocking scripts:** Web Audio API and Supabase Realtime connections must initialize asynchronously and never block first paint.
- **Image/Asset optimization:** Use Next.js `<Image>` component; Rive/Lottie files kept under reasonable size budgets (target: total JS+animation payload < 300KB gzipped above framework baseline).

---

## 6. Site Structure / Pages

1. **Home (`/`)** — Hero section with name, tagline ("Friendly Neighborhood Developer"), day/night synced background, and quick links to other pages.
2. **About (`/about`)** — Bio, education (BCA, PSIT-CHE, CSJMU), and detailed background.
3. **Skills (`/skills`)** — Tech stack visualization (React, Node, Express, MongoDB, etc.).
4. **Projects (`/projects`)** — Project cards (VeggieMart, YT-GENAI, Club Sphere, AI Interview Generator, etc.) with web-cursor interactions.
5. **Resume (`/resume`)** — Fast, minimal-animation page with downloadable resume (recruiter fast-path).
6. **Contact (`/contact`)** — Contact form/links, live visitor presence indicator visible here.

---

## 7. Non-Functional Requirements

- **Accessibility:** Keyboard navigable, semantic HTML, ARIA labels on interactive/animated elements, reduced-motion fallback mandatory (not optional).
- **SEO:** Proper meta tags, Open Graph tags, semantic headings via Next.js App Router metadata API.
- **Responsiveness:** Fully functional and visually coherent from 360px (mobile) to 1920px+ (desktop) widths.
- **Browser support:** Latest 2 versions of Chrome, Firefox, Safari, Edge.

---

## 8. Open Questions / Editor Notes

- Confirm final color palette (suggested: deep red/blue Spider-Man palette + dark "terminal" mode toggle, consistent with prior cyberpunk/terminal branding preference).
- Confirm whether resume PDF is embedded/downloadable or linked externally.
- Confirm analytics requirement (optional: Vercel Analytics for basic visit tracking, separate from Supabase live-presence feature).

---

## 9. Milestones (Suggested Build Order)

1. Next.js scaffold + Tailwind/shadcn base + static content across multiple routes (`/`, `/about`, etc., no animation)
2. Next.js page transitions + GSAP suit-up transitions
3. Rive/Lottie spider animations + loading sequence
4. Web cursor interaction + spidey-sense hover states
5. Supabase Realtime live presence
6. Day/night background + optional weather/rain layer
7. Web Audio SFX (opt-in)
8. Performance pass: throttling tests, reduced-motion fallback, lazy-loading audit
9. Accessibility + SEO pass
10. Deploy to Vercel
