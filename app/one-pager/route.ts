import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const markdown = await readFile(join(process.cwd(), "POSI_ONE_PAGER.md"), "utf8");

  return new Response(markdown, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "content-disposition": 'attachment; filename="POSI_ONE_PAGER.md"',
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
