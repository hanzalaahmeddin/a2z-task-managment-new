import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, User } from "lucide-react"
import Link from "next/link"

const allTasks = [
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
    name: "SSL Certificate Renewal",
    priority: "Medium",
    dueDate: "2024-01-25",
    status: "Pending",
    assignee: "Alex Brown",
    department: "Hosting",
  },
  {
    id: 6,
    name: "Brand Guidelines Update",
    priority: "Low",
    dueDate: "2024-01-30",
    status: "In Progress",
    assignee: "Lisa Chen",
    department: "Design",
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    case "Low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Pending":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function Tasks() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
        <p className="text-gray-600 mt-1">Complete overview of all tasks across departments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTasks.map((task) => (
                <TableRow key={task.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell>
                    <Link href={`/tasks/${task.id}`} className="font-medium hover:text-blue-600">
                      {task.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </TableCell>
                  <TableCell className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {task.dueDate}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  </TableCell>
                  <TableCell className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-1" />
                    {task.assignee}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{task.department}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
