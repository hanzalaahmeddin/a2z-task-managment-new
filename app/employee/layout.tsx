import type React from "react"
import { EmployeeSidebar } from "@/components/employee-sidebar"
import { EmployeeHeader } from "@/components/employee-header"

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <EmployeeSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <EmployeeHeader />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
