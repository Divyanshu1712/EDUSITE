import { AppSidebar } from "../app-sidebar"
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
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header - Shared across all pages */}
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    {/* Left section - Sidebar trigger */}
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />

                    {/* Center section - Company name */}
                    <div className="flex-1 flex justify-center">
                        <CompanyName />
                    </div>

                    {/* Right section - Mode toggle and Profile dropdown */}
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <ProfileDrop />
                    </div>
                </header>

                {/* Main content area - Pages render here via Outlet */}
                <main className="flex flex-1 flex-col">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
