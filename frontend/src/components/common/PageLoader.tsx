/**
 * PageLoader — Global loading overlay for the main content area.
 *
 * Usage:
 *   import PageLoader from "@/components/common/PageLoader"
 *
 *   // Full-area overlay (default) — covers the entire <main> card
 *   <PageLoader />
 *
 *   // With a custom loading message
 *   <PageLoader message="Fetching users..." />
 *
 *   // Inline (small spinner, no overlay) — for buttons / table rows
 *   <PageLoader variant="inline" />
 *
 *   // Skeleton — for card/list placeholders
 *   <PageLoader variant="skeleton" rows={5} />
 */

interface PageLoaderProps {
    /** "overlay" covers the whole parent with a backdrop (default).
     *  "inline" renders just the spinner with no background.
     *  "skeleton" renders animated placeholder rows. */
    variant?: "overlay" | "inline" | "skeleton"
    /** Optional label shown below the spinner (overlay only). */
    message?: string
    /** Number of skeleton rows (skeleton variant). Default: 4 */
    rows?: number
}

// ─── Spinner SVG ──────────────────────────────────────────────────────────────
function Spinner({ size = 40 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            className="animate-spin"
            style={{ animationDuration: "0.75s" }}
        >
            {/* Track */}
            <circle
                cx="20" cy="20" r="16"
                strokeWidth="3.5"
                className="stroke-border"
            />
            {/* Active arc */}
            <circle
                cx="20" cy="20" r="16"
                strokeWidth="3.5"
                strokeDasharray="60 41"
                strokeLinecap="round"
                style={{ stroke: "var(--primary)" }}
            />
        </svg>
    )
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow({ wide }: { wide?: boolean }) {
    return (
        <div className="flex flex-col gap-2">
            <div
                className="h-4 rounded-lg bg-muted animate-pulse"
                style={{ width: wide ? "100%" : `${60 + Math.floor(Math.random() * 30)}%` }}
            />
        </div>
    )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function PageLoader({
    variant = "overlay",
    message,
    rows = 4,
}: PageLoaderProps) {

    // ── Inline spinner ────────────────────────────────────────────────────────
    if (variant === "inline") {
        return (
            <span className="inline-flex items-center gap-2">
                <Spinner size={18} />
                {message && (
                    <span className="text-sm text-muted-foreground">{message}</span>
                )}
            </span>
        )
    }

    // ── Skeleton ──────────────────────────────────────────────────────────────
    if (variant === "skeleton") {
        return (
            <div className="flex flex-col gap-4 p-6 w-full">
                {/* Fake header */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-muted animate-pulse shrink-0" />
                    <div className="flex flex-col gap-1.5 flex-1">
                        <div className="h-4 w-40 rounded-lg bg-muted animate-pulse" />
                        <div className="h-3 w-24 rounded-lg bg-muted animate-pulse opacity-60" />
                    </div>
                </div>
                {/* Fake rows */}
                {Array.from({ length: rows }).map((_, i) => (
                    <SkeletonRow key={i} wide={i % 3 === 0} />
                ))}
                {/* Fake card block */}
                <div className="h-24 w-full rounded-2xl bg-muted animate-pulse opacity-50 mt-2" />
            </div>
        )
    }

    // ── Overlay (default) ────────────────────────────────────────────────────
    return (
        <div
            className="
                absolute inset-0 z-50
                flex flex-col items-center justify-center gap-4
                bg-card/80 backdrop-blur-sm
                rounded-2xl
            "
            aria-label="Loading"
            role="status"
        >
            {/* Outer glow ring */}
            <div className="relative flex items-center justify-center">
                {/* Soft pulsing halo */}
                <span
                    className="absolute w-16 h-16 rounded-full animate-ping opacity-20"
                    style={{ background: "var(--primary)" }}
                />
                {/* Icon card */}
                <div
                    className="
                        relative flex items-center justify-center
                        w-16 h-16 rounded-2xl shadow-lg
                        border border-border bg-card
                    "
                >
                    <Spinner size={36} />
                </div>
            </div>

            {/* Label */}
            <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium text-foreground">
                    {message ?? "Loading…"}
                </p>
                {/* Animated dots */}
                <div className="flex gap-1 mt-0.5">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                                background: "var(--muted-foreground)",
                                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
