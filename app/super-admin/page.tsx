"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { CheckCircle, Clock, AlertTriangle, TrendingUp, Plus, User } from "lucide-react"
import { TaskModal } from "@/components/task-modal"

const overviewData = [
  { title: "Total Projects", value: "24", change: "+12%", icon: TrendingUp, color: "text-blue-600" },
  { title: "Tasks Completed", value: "156", change: "+8%", icon: CheckCircle, color: "text-green-600" },
  { title: "Pending Tasks", value: "43", change: "-5%", icon: Clock, color: "text-yellow-600" },
  { title: "Overdue", value: "12", change: "+3%", icon: AlertTriangle, color: "text-red-600" },
]

const employeeData = [
  { name: "John Doe", assigned: 15, completed: 12, pending: 3, overdue: 0 },
  { name: "Jane Smith", assigned: 12, completed: 8, pending: 3, overdue: 1 },
  { name: "Mike Johnson", assigned: 18, completed: 15, pending: 2, overdue: 1 },
  { name: "Sarah Wilson", assigned: 14, completed: 10, pending: 3, overdue: 1 },
  { name: "Alex Brown", assigned: 10, completed: 8, pending: 2, overdue: 0 },
]

const taskStatusData = [
  { name: "Completed", value: 45, color: "#10b981" },
  { name: "In Progress", value: 30, color: "#3b82f6" },
  { name: "Pending", value: 20, color: "#f59e0b" },
  { name: "Overdue", value: 5, color: "#ef4444" },
]

const departments = [
  { name: "Design Department", projects: 8, employees: 12, completion: 85 },
  { name: "Development Department", projects: 12, employees: 18, completion: 78 },
  { name: "Hosting Support", projects: 4, employees: 6, completion: 92 },
]

export default function SuperAdminDashboard() {
  const [employeeFilter, setEmployeeFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [clientFilter, setClientFilter] = useState("all")
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Super Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Complete overview of all operations</p>
        </div>
        <Button onClick={() => setIsTaskModalOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
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
                <div className={`w-12 h-12 bg-accent rounded-lg flex items-center justify-center`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Employee Name</label>
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
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Department</label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="hosting">Hosting Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Client Name</label>
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="techstart">TechStart Inc</SelectItem>
                  <SelectItem value="global">Global Solutions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Task Completion by Employee</CardTitle>
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
                  <Bar dataKey="pending" fill="hsl(var(--muted))" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
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
      </div>

      {/* Employee Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Employee Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Employee Name</TableHead>
                <TableHead className="text-muted-foreground">Assigned Tasks</TableHead>
                <TableHead className="text-muted-foreground">Completed Tasks</TableHead>
                <TableHead className="text-muted-foreground">Pending Tasks</TableHead>
                <TableHead className="text-muted-foreground">Overdue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeData.map((employee) => (
                <TableRow key={employee.name} className="border-border hover:bg-accent/50">
                  <TableCell className="font-medium text-foreground flex items-center">
                    <User className="w-4 h-4 mr-2 text-muted-foreground" />
                    {employee.name}
                  </TableCell>
                  <TableCell className="text-foreground">{employee.assigned}</TableCell>
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
                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    >
                      {employee.pending}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {employee.overdue > 0 ? (
                      <Badge variant="destructive">{employee.overdue}</Badge>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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

      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
    </div>
  )
}
