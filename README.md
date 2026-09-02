# In the Shadow of the Sun — Luxor 2027

A shareable countdown to the total solar eclipse over Luxor, Egypt, on August 2, 2027.

## GitHub Pages

The repository includes a GitHub Actions workflow that builds and publishes the site automatically. Once GitHub Pages is configured to use **GitHub Actions**, every push to `main` publishes a fresh version.

To verify the static export locally:

```sh
GITHUB_REPOSITORY=EmmaVellard/eclipse-luxor-2027 npm run build:pages
```

The generated static site is written to `dist/client/`.
