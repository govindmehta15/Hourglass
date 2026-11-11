# Vercel deployment

App root: `houre glass` relative to personal_projects; set the equivalent Root Directory relative to the imported Git repository.

Dependencies and builds run on Vercel. No local install is required. Use a Preview deployment first; cloud compilation has not yet been verified.

Uses the committed Vercel framework configuration. Configure any required services before deploying.

Environment variable names referenced in source (not all are required):

No explicit environment variable references found by the source scan.

Set Node.js 22.x for Node apps. For nested workspace apps, retain their workspace lockfile and allow source access outside the app root. Do not place server secrets in client-prefixed variables.
