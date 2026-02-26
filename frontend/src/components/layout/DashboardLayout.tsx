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
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
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
                        <Outlet />
                    </main>

                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
