# Show Unused Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface the already-produced web image assets in the live UI without weakening the launch-shelf positioning.

**Architecture:** Use existing Next.js App Router pages and `next/image`. Keep data unchanged except where existing image paths already support the UI. Add no dependencies.

**Tech Stack:** Next.js 14, React, TypeScript, Tailwind CSS.

---

### Task 1: Homepage And Shop Hero Assets

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/shop/ShopPageClient.tsx`

- [x] Add `/images/heroes/homepage-hero.png` as an editorial image panel in a lower homepage section.
- [x] Add `/images/heroes/shop-hero.png` as ambient art in the shop hero visual.

### Task 2: Quiz Illustration Assets

**Files:**
- Modify: `app/quiz/page.tsx`
- Modify: `app/quiz/results/page.tsx`

- [x] Add three visual recommendation cards using `/images/quiz/step-parent-kids.png`, `/images/quiz/step-teacher.png`, and `/images/quiz/step-teen-adult.png`.

### Task 3: Free Library Source Art Assets

**Files:**
- Modify: `app/coloring-pages/page.tsx`
- Modify: `app/coloring-pages/ColoringPagesBrowserClient.tsx`

- [x] Add a small Happy Town source-art strip on the free library using the optimized `/images/source-pages/*.png` files.
- [x] Keep SVG printable previews as the primary download visuals.

### Task 4: Colors Of Calm Back Cover

**Files:**
- Modify: `app/colors-of-calm/page.tsx`
- Modify: `app/shop/[slug]/page.tsx`

- [x] Add `/images/covers/colors-of-calm-back-cover.png` to Colors of Calm landing/detail context as a "what's inside" visual.

### Task 5: Verify

- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Confirm the previously unused assets are now referenced in app/components/data code.
