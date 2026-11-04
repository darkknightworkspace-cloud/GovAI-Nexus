# GovAI Nexus – Enterprise Design System & Guidelines

## 1. Master Color Palette (Government of Tamil Nadu Baseline)
- **Primary Navy:** `#102A43` (Deep institutional dignity)
- **Dark Navy:** `#071B3B` (Hero & footer surface backgrounds)
- **Primary Blue:** `#2563EB` (Action links, primary interactive states)
- **Primary Purple / Violet:** `#6D28D9` (Brand accent, AI indicators, key buttons)
- **Secondary Purple:** `#7C3AED` (Gradient highlights, interactive focus)
- **Tamil Nadu Teal:** `#0F766E` (Agriculture & environmental services)
- **Neutral Background:** `#F8FAFC` (Clean slate workspace)
- **Pure White:** `#FFFFFF` (Card surfaces and elevations)
- **Primary Typography:** `#0F172A` (Slate 900, optimal readability)
- **Muted Typography:** `#64748B` (Slate 500, secondary metadata)
- **Border Default:** `#E2E8F0` (Subtle 1px card division)
- **Semantic Statuses:**
  - Success: `#15803D` (Approved / Verified)
  - Warning / In Progress: `#D97706` (Under Review / Needs Info)
  - Destructive / Rejected: `#DC2626` (Rejected / Alert)

## 2. Bilingual Typography
- **English Font:** `Inter`, -apple-system, sans-serif
- **Tamil Font:** `Noto Sans Tamil`, sans-serif
- **Hierarchy:**
  - Hero Display: 44px–56px, Bold 800, tight tracking
  - Page Headings: 28px–36px, SemiBold 700
  - Section Headings: 20px–24px, SemiBold 600
  - Body Text: 14px–16px, Regular 400, line-height 1.6
  - Metadata / Captions: 12px–13px, Medium 500

## 3. Anti-AI Slop & Zero-Pill Discipline
- **Zero Pill Badges:** Never wrap informational metadata (dates, categories, read times) in candy-colored rounded pills. Render metadata as quiet inline text separated by typographic middots (`·`).
- **Interactive Controls:** Segmented controls, filter tabs, and action buttons are clean rectangular buttons with subtle rounded corners (`rounded-lg` or `rounded-md`), never floating pill islands.
- **Form Design:** Explicit labels, high contrast borders, clear inline validation errors, visible focus outlines.
- **Accessibility:** Meets WCAG 2.2 AA standards with minimum 4.5:1 contrast ratios and full keyboard navigability.
