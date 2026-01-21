"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Settings2,
  GraduationCap,
} from "lucide-react"

import { NavMain } from "./nav-main"
// import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar"

// EduSITE configuration data
const data = {
  teams: [
    {
      name: "EduSITE",
      logo: GraduationCap,
      plan: "Education Platform",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "User Management",
      url: "/users",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/users",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings",
        },
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-center p-2 text-xs text-muted-foreground">
          <span className="group-data-[collapsible=icon]:hidden">
            © 2025 EduSITE. All rights reserved.
          </span>
          <span className="hidden group-data-[collapsible=icon]:block">
            ©
          </span>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
