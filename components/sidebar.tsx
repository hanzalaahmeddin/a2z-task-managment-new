"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CheckSquare, FolderOpen, Home, Settings, Users, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "My Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Team", href: "/team", icon: Users },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">

        <Image
          src="/images/a2zcreatorz-logo-02.jpg" // your actual image name
          alt="Logo"
          width={120}
          height={32}
          className="rounded" // optional: for rounded corners
        />


      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
