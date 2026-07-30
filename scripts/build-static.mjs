import { mkdir, writeFile, readFile, cp, readdir } from "node:fs/promises";
import { resolve, join } from "node:path";

async function exportStatic() {
  console.log("Generating static HTML from SSR bundle for GitHub Pages...");
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("ts", `${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const res = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    }
  );

  if (res.status !== 200) {
    throw new Error(`Failed to render static HTML: status ${res.status}`);
  }

  let html = await res.text();

  // Rewrite absolute root paths to relative paths for GitHub Pages subpath compatibility (/akmy-band-dashboard/)
  html = html
    .replaceAll('href="/assets/', 'href="./assets/')
    .replaceAll('data-rsc-css-href="/assets/', 'data-rsc-css-href="./assets/')
    .replaceAll('src="/assets/', 'src="./assets/')
    .replaceAll('href="/favicon.svg"', 'href="./favicon.svg"')
    .replaceAll('href="/og.png"', 'href="./og.png"')
    .replaceAll('content="/og.png"', 'content="./og.png"')
    .replaceAll('url(/assets/', 'url(./assets/');

  const distClientDir = resolve(process.cwd(), "dist/client");
  const outDir = resolve(process.cwd(), "out");

  await writeFile(resolve(distClientDir, "index.html"), html, "utf8");
  await writeFile(resolve(distClientDir, ".nojekyll"), "", "utf8");

  await mkdir(outDir, { recursive: true });
  await cp(distClientDir, outDir, { recursive: true });

  // Rewrite absolute paths inside all generated CSS files in out/assets/
  const outAssetsDir = join(outDir, "assets");
  const files = await readdir(outAssetsDir);
  for (const file of files) {
    if (file.endsWith(".css")) {
      const cssPath = join(outAssetsDir, file);
      let css = await readFile(cssPath, "utf8");
      css = css
        .replaceAll("url(/assets/_vinext_fonts/", "url(./_vinext_fonts/")
        .replaceAll("url('/cow-field-bg.png')", "url('../cow-field-bg.png')")
        .replaceAll('url("/cow-field-bg.png")', 'url("../cow-field-bg.png")')
        .replaceAll("url(/cow-field-bg.png)", "url(../cow-field-bg.png)");
      await writeFile(cssPath, css, "utf8");
    }
  }

  // Ensure index.html in outDir has the rewritten relative paths
  await writeFile(resolve(outDir, "index.html"), html, "utf8");

  console.log("✅ Successfully exported static site to ./out/ with GitHub Pages relative path rewrites!");
}

exportStatic().catch((err) => {
  console.error("Static export failed:", err);
  process.exit(1);
});
