import type React from "react"
import { TeamLeadSidebar } from "@/components/team-lead-sidebar"
import { TeamLeadHeader } from "@/components/team-lead-header"

export default function TeamLeadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <TeamLeadSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TeamLeadHeader />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
