"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, AlertTriangle, TrendingUp, Plus, MessageSquare, Calendar } from "lucide-react"
import { TaskModal } from "@/components/task-modal"

const kpiData = [
  { title: "Tasks Assigned", value: "32", change: "+5", icon: TrendingUp, color: "text-blue-600" },
  { title: "In Progress", value: "18", change: "+3", icon: Clock, color: "text-yellow-600" },
  { title: "Completed", value: "28", change: "+8", icon: CheckCircle, color: "text-green-600" },
  { title: "Delayed", value: "4", change: "-2", icon: AlertTriangle, color: "text-red-600" },
]

const teamMembers = [
  { name: "John Doe", assigned: 8, inProgress: 3, completed: 5, deadline: "2024-01-15" },
  { name: "Jane Smith", assigned: 6, inProgress: 2, completed: 4, deadline: "2024-01-18" },
  { name: "Mike Johnson", assigned: 10, inProgress: 4, completed: 6, deadline: "2024-01-20" },
  { name: "Sarah Wilson", assigned: 8, inProgress: 3, completed: 5, deadline: "2024-01-22" },
]

const projects = [
  {
    department: "Design Department",
    projects: [
      { name: "Brand Redesign", progress: 75, dueDate: "2024-02-15" },
      { name: "Mobile App UI", progress: 60, dueDate: "2024-02-28" },
    ],
  },
  {
    department: "Development Department",
    projects: [
      { name: "API Integration", progress: 90, dueDate: "2024-01-30" },
      { name: "Database Migration", progress: 45, dueDate: "2024-03-15" },
    ],
  },
  {
    department: "Hosting Support",
    projects: [
      { name: "Server Upgrade", progress: 100, dueDate: "2024-01-25" },
      { name: "SSL Implementation", progress: 80, dueDate: "2024-02-10" },
    ],
  },
]

const activityFeed = [
  { id: 1, user: "John Doe", action: "completed task", task: "Homepage Design", time: "2 hours ago" },
  { id: 2, user: "Jane Smith", action: "commented on", task: "API Documentation", time: "4 hours ago" },
  { id: 3, user: "Mike Johnson", action: "updated status", task: "Database Schema", time: "6 hours ago" },
  { id: 4, user: "Sarah Wilson", action: "submitted for review", task: "User Testing", time: "8 hours ago" },
]

export default function TeamLeadDashboard() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Lead Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your team and track project progress</p>
        </div>
        <Button onClick={() => setIsTaskModalOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Assign Task
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((item) => (
          <Card key={item.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  <p className="text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="text-xs text-green-600 mt-1">{item.change} this week</p>
                </div>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members Table */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">Assigned</TableHead>
                    <TableHead className="text-muted-foreground">In Progress</TableHead>
                    <TableHead className="text-muted-foreground">Completed</TableHead>
                    <TableHead className="text-muted-foreground">Next Deadline</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.name} className="border-border hover:bg-accent/50">
                      <TableCell className="font-medium text-foreground">{member.name}</TableCell>
                      <TableCell className="text-foreground">{member.assigned}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        >
                          {member.inProgress}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        >
                          {member.completed}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                        {member.deadline}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Team Activity Feed */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <MessageSquare className="w-5 h-5 mr-2" />
              Team Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-foreground">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                      <span className="font-medium">{activity.task}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects by Department */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((dept) => (
          <Card key={dept.department} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">{dept.department}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dept.projects.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{project.name}</span>
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-accent rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Due: {project.dueDate}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
    </div>
  )
}
