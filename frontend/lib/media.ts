import { API_URL } from "./constants";
/** Backend-upload paths and local public assets have different origins. */
export function journalImage(source: string | undefined) {
  if (!source) return "/SnS/soul-journal.webp";
  if (source.includes("seed/food") || source.includes("malaiyo") || source.includes("malaiyyo")) {
    return "/SnS/malaiyo-kashi.webp";
  }
  if (source.startsWith("/uploads/") || source.startsWith("uploads/")) {
    return `${API_URL.replace(/\/api\/?$/, "")}/${source.replace(/^\//, "")}`;
  }
  return source.startsWith("/") || /^https?:\/\//.test(source)
    ? source
    : "/SnS/soul-journal.webp";
}
