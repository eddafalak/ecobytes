import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Prismic webhook: called when content is published. Expires every cached Prismic response, so
 * pages are rebuilt with the new content on their next visit.
 *
 * Set it up in Prismic → Settings → Webhooks with the URL https://<your-site>/api/revalidate and
 * the same secret as PRISMIC_WEBHOOK_SECRET in your environment variables.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { secret?: string };
  const secret = process.env.PRISMIC_WEBHOOK_SECRET;
  if (!secret || body.secret !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
  revalidateTag("prismic", "max");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
