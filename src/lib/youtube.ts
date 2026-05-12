/** Extrait l’identifiant vidéo YouTube pour iframe embed. */
export function youtubeVideoIdFromUrl(url: string | undefined): string | null {
  if (!url || typeof url !== "string") return null;
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }
    if (host.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) return v;
      const m = u.pathname.match(/\/embed\/([\w-]{11})/);
      if (m) return m[1];
      const s = u.pathname.match(/\/shorts\/([\w-]{11})/);
      if (s) return s[1];
    }
  } catch {
    return null;
  }
  return null;
}
