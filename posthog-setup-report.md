<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Skild TanStack Start project. Here's a summary of every change made:

- **`src/routes/__root.tsx`** — Added `PostHogProvider` from `@posthog/react` wrapping the entire app. Configured with the EU host (`https://eu.i.posthog.com`), a `/ingest` reverse proxy path, exception capture enabled, and debug mode in development.
- **`vite.config.ts`** — Added a reverse proxy to route `/ingest/static`, `/ingest/array`, and `/ingest` requests to `eu-assets.i.posthog.com` / `eu.i.posthog.com`, improving reliability and avoiding CORS issues.
- **`src/utils/posthog-server.ts`** *(new file)* — Singleton server-side PostHog client using `posthog-node` for future server-side event capture in API routes.
- **`.env`** — Added `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` environment variables.
- **`src/routes/index.tsx`** — Tracks `browse_registry_clicked` and `publish_skill_clicked` when users interact with the homepage hero CTAs.
- **`src/components/SkillCard.tsx`** — Tracks `skill_install_command_copied` (with skill title, category, and command), `skill_opened`, and `skill_upvote_clicked` on the respective interactions.
- **`src/components/Navbar.tsx`** — Tracks `sign_in_clicked` when the Sign In button in the navbar is clicked.
- **`src/routes/__auth/sign-in.$.tsx`** — Tracks `sign_in_page_viewed` on mount (top of auth funnel).
- **`src/routes/__auth/sign-up.$.tsx`** — Tracks `sign_up_page_viewed` on mount (top of registration funnel).

## Events

| Event | Description | File |
|-------|-------------|------|
| `browse_registry_clicked` | User clicked the "Browse Registry" CTA on the homepage hero | `src/routes/index.tsx` |
| `publish_skill_clicked` | User clicked the "Publish Skill" CTA on the homepage hero | `src/routes/index.tsx` |
| `skill_install_command_copied` | User copied the install command from a SkillCard | `src/components/SkillCard.tsx` |
| `skill_opened` | User clicked the "Open" link on a SkillCard | `src/components/SkillCard.tsx` |
| `skill_upvote_clicked` | User clicked the upvote button on a SkillCard | `src/components/SkillCard.tsx` |
| `sign_in_clicked` | User clicked the Sign In button in the navbar | `src/components/Navbar.tsx` |
| `sign_in_page_viewed` | User landed on the sign-in page (top of auth funnel) | `src/routes/__auth/sign-in.$.tsx` |
| `sign_up_page_viewed` | User landed on the sign-up page (top of registration funnel) | `src/routes/__auth/sign-up.$.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/project/163058/dashboard/694719)
- [Homepage CTA Clicks](/project/163058/insights/Uajh2WZC) — Browse Registry vs Publish Skill clicks over time
- [Skill Engagement](/project/163058/insights/U87QcmAS) — Install copies, skill opens, and upvotes over time
- [Auth Conversion Funnel](/project/163058/insights/GCVfIQze) — Sign In click → Sign In page viewed conversion
- [Sign-In vs Sign-Up Page Views](/project/163058/insights/NdbDYuCC) — Daily auth page visits side by side
- [Total Skill Installs (30d)](/project/163058/insights/G9uuR6sr) — Bold number of install command copies

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
