import { AppSidebar } from "../dashboard/app-sidebar"
import { ModeToggle } from "../common/mode-toggle"
import CompanyName from "../dashboard/header-compnay-name"
import ProfileDrop from "../dashboard/porfile-drop"
import { Separator } from "../ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../ui/sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import PageLoader from "../common/PageLoader"

export default function DashboardLayout() {
    const location = useLocation()
    const [isNavigating, setIsNavigating] = useState(false)

    /**
     * prevPathnameRef is initialised to the CURRENT pathname.
     * Effect only fires the loader when the pathname is DIFFERENT from the
     * previous one — this means:
     *  • Initial mount  → paths are equal → no loader (safe in StrictMode too)
     *  • Sidebar click  → paths differ   → loader shows for 400ms then clears
     *  • Same link click → paths equal   → no loader
     */
    const prevPathnameRef = useRef(location.pathname)

    useEffect(() => {
        if (prevPathnameRef.current === location.pathname) return  // same route – skip

        prevPathnameRef.current = location.pathname  // update stored path
        setIsNavigating(true)
        const timer = setTimeout(() => setIsNavigating(false), 400)
        return () => clearTimeout(timer)             // cancel if next nav fires early
    }, [location.pathname])

    return (
        /*
         * Outer canvas: full viewport, padded, background from CSS var.
         * This is the "alive area" that everything floats inside.
         */
        <div className="flex h-svh w-full bg-background p-2 gap-0 overflow-hidden">

            {/* ── Sidebar (left column) — floats inside the canvas with rounded corners ── */}
            <SidebarProvider
                className="min-h-0! w-auto! flex-none! contents"
                style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
            >
                {/* AppSidebar renders the actual sidebar panel */}
                <AppSidebar variant="floating" />

                {/* ── Right column: header + main stacked ── */}
                <SidebarInset className="flex flex-col flex-1 min-w-0 gap-2 overflow-hidden m-0! rounded-none! bg-transparent">

                    {/* ── Header card ── */}
                    <header className="
                        flex shrink-0 items-center gap-2 px-4
                        h-14
                        bg-card text-card-foreground
                        border border-border
                        rounded-2xl
                        shadow-sm
                        transition-all duration-200 ease-linear
                    ">
                        {/* Sidebar trigger */}
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />

                        {/* Center — Company name */}
                        <div className="flex-1 flex justify-center">
                            <CompanyName />
                        </div>

                        {/* Right — theme toggle + profile */}
                        <div className="flex items-center gap-2">
                            <ModeToggle />
                            <ProfileDrop />
                        </div>
                    </header>

                    {/* ── Main content card ── */}
                    <main className="
                        relative
                        flex flex-1 flex-col min-h-0 overflow-y-auto
                        bg-card text-card-foreground
                        border border-border
                        rounded-2xl
                        shadow-sm
                        custom-scrollbar
                    ">
                        {/*
                          * PageLoader is scoped to <main> because <main> has `relative`.
                          * `absolute inset-0` fills only this card — sidebar & header untouched.
                          */}
                        {isNavigating && <PageLoader message="Loading page…" />}

                        {/* Fade old content out while navigating, fade new content in after */}
                        <div
                            className="flex flex-1 flex-col min-h-0 transition-opacity duration-200"
                            style={{ opacity: isNavigating ? 0 : 1, pointerEvents: isNavigating ? "none" : "auto" }}
                        >
                            <Outlet />
                        </div>
                    </main>

                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
