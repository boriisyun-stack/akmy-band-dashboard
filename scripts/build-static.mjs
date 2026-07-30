import { mkdir, writeFile, cp } from "node:fs/promises";
import { resolve } from "node:path";

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

  const html = await res.text();
  const distClientDir = resolve(process.cwd(), "dist/client");
  const outDir = resolve(process.cwd(), "out");

  await writeFile(resolve(distClientDir, "index.html"), html, "utf8");
  await writeFile(resolve(distClientDir, ".nojekyll"), "", "utf8");

  await mkdir(outDir, { recursive: true });
  await cp(distClientDir, outDir, { recursive: true });

  console.log("✅ Successfully exported static site to ./out/ (ready for GitHub Pages)!");
}

exportStatic().catch((err) => {
  console.error("Static export failed:", err);
  process.exit(1);
});
