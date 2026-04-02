# Automation Masterclass — Why This Matters Section

## Current State

The landing page (`src/frontend/src/App.tsx`) has these sections in order:
1. `<HeroSection />` — sky/cloud theme, light blue/white gradient
2. `<ProblemSection />` (id="problem") — what we call "What You Will Learn" context
3. `<WhatWeBuildSection />`
4. `<SpeakersSection />`
5. `<WhoItIsForSection />`
6. `<FOMOSection />`
7. `<RegistrationSection />` (id="register")
8. `<CredibilitySection />`
9. `<ServicesSection />`
10. `<FinalCTASection />`

Existing utilities available in App.tsx:
- `useReveal()` hook — returns a ref; adds `reveal` CSS class, triggers `visible` on scroll
- `useCountUp(target, duration)` hook — returns `{ ref, count }` for animated count-up
- `scrollToRegister()` function — scrolls to `#register`
- CSS classes: `reveal`, `reveal.visible`, `reveal-delay-1/2/3/4`, `btn-amber`, `grad-text`, `sky-card`, `card-lift`
- Framer Motion (`motion` from `motion/react`) available
- Lucide React icons available

## Requested Changes (Diff)

### Add
- A new `WhyThisMattersSection` React component inserted between `<HeroSection />` and `<ProblemSection />` in the render tree
- The section uses dark navy background `#001a3d` with cyan `#00D9FF` accent and white text — contrasting from the rest of the page
- New CSS keyframes/classes added to index.css: `@keyframes cyan-glow-pulse`, `@keyframes line-draw`, `@keyframes typewriter-cursor`, `.cyan-glow-border`, `.cyan-glow-pulse`

### Modify
- `App.tsx`: Insert `<WhyThisMattersSection />` between `<HeroSection />` and `<ProblemSection />` in the JSX render
- `App.tsx`: Add the `WhyThisMattersSection` function component (can be in App.tsx directly or a separate component file)

### Remove
- Nothing

## Implementation Plan

1. **Create `src/frontend/src/components/WhyThisMattersSection.tsx`** as a self-contained component with all sub-sections inside it.

2. **Sub-sections inside the component** (all on dark `#001a3d` background):

   a. **Section Opener**
      - Small cyan uppercase label "THE TRUTH NOBODY IS TELLING YOU" — fade-in on scroll
      - Large typewriter-animated white headline: "AI can think. / APIs can connect. / But only automation can DO."
      - Small white subtext fade-in
      - Thin cyan animated line that draws left-to-right on scroll

   b. **3-Column Comparison**
      - Col 1 (AI Tools): grey icon, grey label, green ticks, red scenario box, red badge
      - Col 2 (N8N/Workflows): grey icon, grey label, green ticks, red scenario box, red badge
      - Col 3 (UiPath RPA): glowing cyan pulsing border, 10% scale larger, cyan icon, cyan label, amber "Maharishi Teaches Live" badge, cyan ticks (7 items), cyan scenario box, glowing cyan badge
      - Staggered slide-up on scroll
      - Desktop/tablet: 3 columns; mobile: 1 column stacked

   c. **Aha Moment Box**
      - Full-width dark box with cyan glow border
      - Left: "WITHOUT RPA" — animated person frantically clicking (CSS animation), fast spinning clock, red text "3 hours. Every day. Forever."
      - Center: right arrow with "April 12" text
      - Right: "WITH RPA" — calm bot animation, slow clock, cyan text
      - Below: bold white quote + small cyan attribution

   d. **Live Automation Demo Visual**
      - 6-step workflow looping animation (5s loop, each step lit 0.7s)
      - Steps horizontal on desktop, vertical on mobile
      - Label above: "This is what runs live on April 12."
      - Label below: "No API used. No human needed."

   e. **Industry Grid**
      - Headline + subtext
      - 4x3 grid of 12 cards (4 col desktop, 3 col tablet, 2 col mobile)
      - Cards: dark navy, thin grey border, hover glows cyan + lifts + icon pulses
      - Closing cyan bold text

   f. **Pattern Reveal Box**
      - Full-width glowing cyan border box
      - 3 rows appear one-by-one on scroll, each preceded by animated arrow
      - Bold white closing paragraph

   g. **Counter Row**
      - 3 count-up stats: "30+", "40+", "200"
      - Thin cyan vertical dividers between them
      - Desktop side-by-side; mobile stacked

   h. **Mic Drop Line**
      - Full-width, no border
      - "AI can suggest." / "APIs can connect." (white, large)
      - "But only RPA automation can replace." (electric blue, slightly larger)
      - Small white subtext

   i. **Mini CTA**
      - Bold white text
      - Amber glowing button "Explore the Full Session →" that calls `scrollToRegister()`
      - Small grey details text

3. **Animation rules**:
   - All animations trigger on IntersectionObserver (scroll into view), not on page load
   - Typewriter: letters appear one-by-one using useEffect + setInterval
   - Count-up: reuse `useCountUp` pattern from App.tsx
   - Line draw: CSS `scaleX` from 0 to 1 on scroll trigger
   - Stagger: 0.15s between comparison cards
   - Pulsing glow: 2s loop keyframe
   - Fade-in: 0.6s ease-in from below (reuse `reveal` class)
   - Workflow loop: setInterval every 5000ms, each step 700ms

4. **Fonts**: inherit from body (`Plus Jakarta Sans`, `Satoshi`), use same font-display/font-body classes

5. **Import and insert** `<WhyThisMattersSection />` in `App.tsx` between `<HeroSection />` and `<ProblemSection />`

6. **Do NOT change** any existing sections, components, styles, or functionality.
