# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application. The app uses Vite, React Router, Bootstrap, and the backend API routes under `/api`.

## Environment

When running in Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes variables prefixed with `VITE_` through `import.meta.env`. When `VITE_CODESPACE_NAME` is defined, frontend components call backend endpoints like:

```text
https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/users/
```

When `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000/api/...` so local development does not generate `https://undefined-8000...` URLs.
