"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Clock, AlertTriangle, CheckCircle, CalendarIcon, Bell, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const employeeTasks = [
  {
    id: 1,
    title: "Design Homepage Mockup",
    priority: "High",
    dueDate: "2024-01-15",
    status: "In Progress",
    description: "Create responsive homepage design",
    assignedBy: "Team Lead",
  },
  {
    id: 2,
    title: "Update User Documentation",
    priority: "Medium",
    dueDate: "2024-01-18",
    status: "Pending",
    description: "Review and update user guide",
    assignedBy: "Project Manager",
  },
  {
    id: 3,
    title: "Fix Login Bug",
    priority: "High",
    dueDate: "2024-01-12",
    status: "Completed",
    description: "Resolve authentication issue",
    assignedBy: "Team Lead",
  },
  {
    id: 4,
    title: "Prepare Presentation",
    priority: "Low",
    dueDate: "2024-01-25",
    status: "Upcoming",
    description: "Create slides for team meeting",
    assignedBy: "Manager",
  },
]

const todayDeadlines = [
  { task: "Review Code Changes", time: "2:00 PM" },
  { task: "Client Call", time: "4:30 PM" },
  { task: "Submit Report", time: "5:00 PM" },
]

const notifications = [
  { id: 1, message: "New task assigned: API Integration", time: "10 min ago", type: "task" },
  { id: 2, message: "Deadline reminder: Homepage Design", time: "1 hour ago", type: "reminder" },
  { id: 3, message: "Comment on your task: User Testing", time: "2 hours ago", type: "comment" },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
    case "Low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    case "In Progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
    case "Pending":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    case "Upcoming":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="w-4 h-4" />
    case "In Progress":
      return <Clock className="w-4 h-4" />
    case "Pending":
      return <AlertTriangle className="w-4 h-4" />
    case "Upcoming":
      return <CalendarIcon className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}

export default function EmployeeDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/auth/login")
  }

  const filterTasksByStatus = (status: string) => {
    return employeeTasks.filter((task) => task.status === status)
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome, {currentUser.name}</h1>
            <p className="text-muted-foreground">Employee Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Task Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                  <p className="text-2xl font-bold text-foreground">{employeeTasks.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{filterTasksByStatus("In Progress").length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{filterTasksByStatus("Completed").length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{filterTasksByStatus("Pending").length}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Tasks Section */}
          <div className="lg:col-span-3">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pending" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-muted">
                    <TabsTrigger value="pending" className="data-[state=active]:bg-background">
                      Pending ({filterTasksByStatus("Pending").length})
                    </TabsTrigger>
                    <TabsTrigger value="in-progress" className="data-[state=active]:bg-background">
                      In Progress ({filterTasksByStatus("In Progress").length})
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="data-[state=active]:bg-background">
                      Completed ({filterTasksByStatus("Completed").length})
                    </TabsTrigger>
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-background">
                      Upcoming ({filterTasksByStatus("Upcoming").length})
                    </TabsTrigger>
                  </TabsList>

                  {["Pending", "In Progress", "Completed", "Upcoming"].map((status) => (
                    <TabsContent key={status} value={status.toLowerCase().replace(" ", "-")} className="mt-6">
                      <div className="grid gap-4">
                        {filterTasksByStatus(status).map((task) => (
                          <Card key={task.id} className="bg-background border-border hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    {getStatusIcon(task.status)}
                                    <h3 className="font-medium text-foreground">{task.title}</h3>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                                  <div className="flex items-center space-x-4">
                                    <Badge className={getPriorityColor(task.priority)}>{task.priority} Priority</Badge>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <CalendarIcon className="w-4 h-4 mr-1" />
                                      Due: {task.dueDate}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Assigned by: {task.assignedBy}</div>
                                  </div>
                                </div>
                                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar Widget */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border-0" />
              </CardContent>
            </Card>

            {/* Today's Deadlines */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Clock className="w-5 h-5 mr-2" />
                  Today's Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-accent rounded-lg">
                      <span className="text-sm font-medium text-foreground">{deadline.task}</span>
                      <span className="text-xs text-muted-foreground">{deadline.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notifications Panel */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 bg-accent rounded-lg">
                      <p className="text-sm text-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
