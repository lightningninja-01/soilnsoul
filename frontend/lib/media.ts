import { API_URL } from "./constants";
/** Backend-upload paths and local public assets have different origins. */
export function journalImage(source: string | undefined) {
  if (!source) return "/images/hero/hero-3.jpg";
  if (source.startsWith("/uploads/") || source.startsWith("uploads/")) {
    return `${API_URL.replace(/\/api\/?$/, "")}/${source.replace(/^\//, "")}`;
  }
  return source.startsWith("/") || /^https?:\/\//.test(source)
    ? source
    : "/images/hero/hero-3.jpg";
}
