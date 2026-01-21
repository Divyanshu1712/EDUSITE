import {
    BadgeCheck,
    Bell,
    LogOut,
    User,
} from "lucide-react"

import { Button } from "../ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { useAuth } from "../../providers/auth-provider"
import { useNavigate } from "react-router-dom"

export default function ProfileDrop() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    // Get initials for avatar fallback
    const getInitials = (email: string) => {
        if (!email) return "U"
        const name = email.split('@')[0]
        return name
            .split(/[._-]/)
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const userName = user?.email?.split('@')[0] || "User"
    const userEmail = user?.email || "user@edusite.com"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={userName} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {getInitials(userEmail)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="sr-only">User menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src="" alt={userName} />
                            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs">
                                {getInitials(userEmail)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{userName}</span>
                            <span className="truncate text-xs text-muted-foreground">{userEmail}</span>
                            {user?.role && (
                                <span className="truncate text-xs text-muted-foreground font-semibold">
                                    {user.role}
                                </span>
                            )}
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <BadgeCheck />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                >
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}