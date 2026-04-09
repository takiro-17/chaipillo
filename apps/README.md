## Preview Deployments

This repository now includes two self-contained static app folders that can be deployed independently for preview testing:

- `apps/owner-web`
- `apps/user-mobile-web`

Each folder contains the shared Supabase bridge files it needs, so a static host can publish that folder directly without serving files from the repository root.

Suggested Cloudflare Pages setup:

1. Create one Pages project for the owner preview.
2. Create another Pages project for the user preview.
3. Keep the project root at the repository root.
4. Set the build command to `exit 0`.
5. Set the build output directory to `apps/owner-web` or `apps/user-mobile-web` for the matching project.
6. Use the generated `*.pages.dev` URLs for testing first.
7. Later, connect `chaipillo.online` to the owner web app when production is ready.

This keeps preview testing simple while the original source layout stays untouched.
