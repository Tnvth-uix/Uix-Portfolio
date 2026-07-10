const ALLOWED_HOSTS = new Set(["iytpfckxdikpqqzmstyp.supabase.co"]);

export async function GET(request) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return new Response("Invalid url parameter", { status: 400 });
  }

  if (parsed.protocol !== "https:" || !ALLOWED_HOSTS.has(parsed.hostname)) {
    return new Response("Forbidden", { status: 403 });
  }

  const upstream = await fetch(parsed.toString());

  if (!upstream.ok) {
    return new Response("Unable to fetch PDF", { status: upstream.status });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "application/pdf",
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
