"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
  User,
  MessageSquare,
  Edit,
  Trash2,
} from "lucide-react"
import { Header } from "@/components/header"
import { EditTaskModal } from "@/components/edit-task-modal"

const overviewData = [
  { title: "Total Tasks", value: "156", change: "+12%", icon: TrendingUp, color: "text-blue-600" },
  { title: "Completed", value: "89", change: "+8%", icon: CheckCircle, color: "text-green-600" },
  { title: "In Progress", value: "45", change: "+5%", icon: Clock, color: "text-yellow-600" },
  { title: "Overdue", value: "22", change: "-3%", icon: AlertTriangle, color: "text-red-600" },
]

const tasks = [
  {
    id: 1,
    name: "Design Homepage Mockup",
    priority: "High",
    dueDate: "2024-01-15",
    status: "In Progress",
    assignee: "John Doe",
    department: "Design",
  },
  {
    id: 2,
    name: "API Integration",
    priority: "Medium",
    dueDate: "2024-01-18",
    status: "Pending",
    assignee: "Jane Smith",
    department: "Development",
  },
  {
    id: 3,
    name: "User Testing",
    priority: "Low",
    dueDate: "2024-01-20",
    status: "Completed",
    assignee: "Mike Johnson",
    department: "Design",
  },
  {
    id: 4,
    name: "Database Optimization",
    priority: "High",
    dueDate: "2024-01-12",
    status: "In Progress",
    assignee: "Sarah Wilson",
    department: "Development",
  },
  {
    id: 5,
    name: "SSL Certificate Setup",
    priority: "Medium",
    dueDate: "2024-01-25",
    status: "Pending",
    assignee: "Alex Brown",
    department: "Hosting",
  },
]

const employeeData = [
  { name: "John Doe", completed: 12, inProgress: 3, pending: 1 },
  { name: "Jane Smith", completed: 8, inProgress: 5, pending: 2 },
  { name: "Mike Johnson", completed: 15, inProgress: 2, pending: 0 },
  { name: "Sarah Wilson", completed: 10, inProgress: 4, pending: 3 },
  { name: "Alex Brown", completed: 6, inProgress: 2, pending: 1 },
]

const taskStatusData = [
  { name: "Completed", value: 45, color: "#10b981" },
  { name: "In Progress", value: 30, color: "#3b82f6" },
  { name: "Pending", value: 20, color: "#f59e0b" },
  { name: "Overdue", value: 5, color: "#ef4444" },
]

const weeklyData = [
  { week: "Week 1", completed: 8, created: 12 },
  { week: "Week 2", completed: 12, created: 10 },
  { week: "Week 3", completed: 15, created: 14 },
  { week: "Week 4", completed: 10, created: 8 },
]

const departments = [
  { name: "Design Department", projects: 8, employees: 12, completion: 85 },
  { name: "Development Department", projects: 12, employees: 18, completion: 78 },
  { name: "Hosting Support", projects: 4, employees: 6, completion: 92 },
]

const recentActivity = [
  { id: 1, user: "John Doe", action: "completed task", task: "Homepage Design", time: "2 hours ago" },
  { id: 2, user: "Jane Smith", action: "commented on", task: "API Documentation", time: "4 hours ago" },
  { id: 3, user: "Mike Johnson", action: "updated status", task: "Database Schema", time: "6 hours ago" },
  { id: 4, user: "Sarah Wilson", action: "submitted for review", task: "User Testing", time: "8 hours ago" },
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
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
  }
}

export default function Dashboard() {
  const [employeeFilter, setEmployeeFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) return false
    if (departmentFilter !== "all" && task.department !== departmentFilter) return false
    return true
  })

  const handleEditTask = (task: any) => {
    setSelectedTask(task)
    setEditTaskModalOpen(true)
  }

  const handleUpdateTask = (updatedTask: any) => {
    // Update task in the tasks array
    console.log("Task updated:", updatedTask)
  }

  const handleDeleteTask = (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      console.log("Task deleted:", taskId)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Management Dashboard</h1>
          <p className="text-muted-foreground mt-1">Complete overview of all tasks and projects</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewData.map((item) => (
            <Card key={item.title} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                    <p className="text-2xl font-bold text-foreground">{item.value}</p>
                    <p className={`text-xs ${item.change.startsWith("+") ? "text-green-600" : "text-red-600"} mt-1`}>
                      {item.change} from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Task Status Chart */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Task Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={taskStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {taskStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {taskStatusData.map((item) => (
                      <div key={item.name} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">
                          {item.name}: {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
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

            {/* Departments */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <Card key={dept.name} className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="font-medium text-foreground">{dept.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Employees</span>
                      <span className="font-medium text-foreground">{dept.employees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      >
                        {dept.completion}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {/* Filters */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Department</label>
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Hosting">Hosting Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Employee</label>
                    <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Employees</SelectItem>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="jane">Jane Smith</SelectItem>
                        <SelectItem value="mike">Mike Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tasks Table */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">All Tasks ({filteredTasks.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Task Name</TableHead>
                      <TableHead className="text-muted-foreground">Priority</TableHead>
                      <TableHead className="text-muted-foreground">Due Date</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Assignee</TableHead>
                      <TableHead className="text-muted-foreground">Department</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => (
                      <TableRow key={task.id} className="border-border hover:bg-accent/50 group">
                        <TableCell className="font-medium text-foreground">
                          <div className="flex items-center justify-between">
                            <span>{task.name}</span>
                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditTask(task)}
                                className="h-6 w-6 p-0"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteTask(task.id)}
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </TableCell>
                        <TableCell className="text-foreground flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                          {task.dueDate}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        </TableCell>
                        <TableCell className="text-foreground flex items-center">
                          <User className="w-4 h-4 mr-1 text-muted-foreground" />
                          {task.assignee}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{task.department}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Employee Performance */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Employee Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={employeeData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="name" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="completed" fill="hsl(var(--primary))" name="Completed" />
                        <Bar dataKey="inProgress" fill="#f59e0b" name="In Progress" />
                        <Bar dataKey="pending" fill="#ef4444" name="Pending" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Trends */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Weekly Task Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="week" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
                        <Line
                          type="monotone"
                          dataKey="created"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          name="Created"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            {/* Team Performance Table */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Employee Name</TableHead>
                      <TableHead className="text-muted-foreground">Completed Tasks</TableHead>
                      <TableHead className="text-muted-foreground">In Progress</TableHead>
                      <TableHead className="text-muted-foreground">Pending</TableHead>
                      <TableHead className="text-muted-foreground">Total Assigned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeData.map((employee) => (
                      <TableRow key={employee.name} className="border-border hover:bg-accent/50">
                        <TableCell className="font-medium text-foreground flex items-center">
                          <User className="w-4 h-4 mr-2 text-muted-foreground" />
                          {employee.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          >
                            {employee.completed}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          >
                            {employee.inProgress}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          >
                            {employee.pending}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-foreground">
                          {employee.completed + employee.inProgress + employee.pending}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <EditTaskModal
          isOpen={editTaskModalOpen}
          onClose={() => setEditTaskModalOpen(false)}
          task={selectedTask}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  )
}
