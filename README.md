# My-Todo-List

## Auto deploy to GitHub Pages

This project includes a workflow at `.github/workflows/deploy.yml` that deploys on every push to `main`.

### One-time setup

1. Push this repository to GitHub.
2. In GitHub, open **Settings -> Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` and wait for the **Deploy to GitHub Pages** workflow to finish.
5. Your app will be live at: `https://<your-username>.github.io/<your-repo-name>/`

### Build safety check

Before every build, this project now runs an import-path casing check.

- Run manually: `npm run check:import-case`
- Runs automatically when you run: `npm run build`

This prevents Linux deploy failures caused by case mismatches like `./header.jsx` vs `./Header.jsx`.
