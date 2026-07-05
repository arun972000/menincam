/**
 * Minimal route-transition fallback. A single gold ring that breathes — no
 * heavy assets. Fills the whole viewport so the footer starts BELOW the fold
 * while a lazy page chunk loads: when the page mounts, the footer's move
 * happens off-screen and never counts as layout shift (CLS).
 */
export default function PageLoader() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center" role="status" aria-label="Loading">
      <span className="relative flex h-12 w-12">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full border border-gold/40" />
        <span className="relative inline-flex h-12 w-12 rounded-full border border-gold/70" />
      </span>
    </div>
  );
}
