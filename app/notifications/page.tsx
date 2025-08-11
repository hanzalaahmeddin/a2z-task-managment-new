"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  MessageSquare,
  Calendar,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "New Task Assigned",
    message: "You have been assigned a new task: 'Design Homepage Mockup' for State Life project",
    type: "task",
    priority: "high",
    isRead: false,
    timestamp: "2024-01-15T10:30:00Z",
    sender: "Sarah Wilson",
    project: "State Life Website Redesign",
  },
  {
    id: 2,
    title: "Task Deadline Approaching",
    message: "Task 'Update User Documentation' is due in 2 days",
    type: "reminder",
    priority: "medium",
    isRead: false,
    timestamp: "2024-01-15T09:15:00Z",
    sender: "System",
    project: "A2Z Creatorz Mobile App",
  },
  {
    id: 3,
    title: "Comment on Your Task",
    message: "John Doe commented on your task: 'Great work on the design! Please make the header slightly larger.'",
    type: "comment",
    priority: "low",
    isRead: true,
    timestamp: "2024-01-15T08:45:00Z",
    sender: "John Doe",
    project: "Tech Solutions Branding",
  },
  {
    id: 4,
    title: "Project Status Update",
    message: "State Life Website Redesign project has been moved to 'In Progress' status",
    type: "project",
    priority: "medium",
    isRead: true,
    timestamp: "2024-01-14T16:20:00Z",
    sender: "Mike Johnson",
    project: "State Life Website Redesign",
  },
  {
    id: 5,
    title: "Team Meeting Scheduled",
    message: "Weekly team meeting scheduled for tomorrow at 10:00 AM in Conference Room A",
    type: "meeting",
    priority: "high",
    isRead: false,
    timestamp: "2024-01-14T14:30:00Z",
    sender: "Sarah Wilson",
    project: "General",
  },
  {
    id: 6,
    title: "Task Completed",
    message: "Your task 'Fix Login Bug' has been marked as completed",
    type: "task",
    priority: "low",
    isRead: true,
    timestamp: "2024-01-14T12:15:00Z",
    sender: "System",
    project: "Tech Solutions Platform",
  },
  {
    id: 7,
    title: "New Team Member Added",
    message: "Lisa Chen has been added to your project team for A2Z Creatorz Mobile App",
    type: "team",
    priority: "medium",
    isRead: false,
    timestamp: "2024-01-14T11:00:00Z",
    sender: "Admin",
    project: "A2Z Creatorz Mobile App",
  },
  {
    id: 8,
    title: "Client Feedback Received",
    message: "State Life Insurance has provided feedback on the latest design mockups",
    type: "feedback",
    priority: "high",
    isRead: true,
    timestamp: "2024-01-13T15:45:00Z",
    sender: "Ahmed Ali",
    project: "State Life Website Redesign",
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "task":
      return <CheckCircle className="w-4 h-4" />
    case "reminder":
      return <Clock className="w-4 h-4" />
    case "comment":
      return <MessageSquare className="w-4 h-4" />
    case "project":
      return <AlertTriangle className="w-4 h-4" />
    case "meeting":
      return <Calendar className="w-4 h-4" />
    case "team":
      return <User className="w-4 h-4" />
    case "feedback":
      return <MessageSquare className="w-4 h-4" />
    default:
      return <Bell className="w-4 h-4" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "task":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
    case "reminder":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
    case "comment":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    case "project":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
    case "meeting":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
    case "team":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
    case "feedback":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
  }
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) {
    return "Just now"
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }
}

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.sender.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesPriority = priorityFilter === "all" || notification.priority === priorityFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "read" && notification.isRead) ||
      (statusFilter === "unread" && !notification.isRead)

    return matchesSearch && matchesType && matchesPriority && matchesStatus
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const stats = {
    total: notifications.length,
    unread: unreadCount,
    high: notifications.filter((n) => n.priority === "high").length,
    today: notifications.filter((n) => {
      const today = new Date().toDateString()
      return new Date(n.timestamp).toDateString() === today
    }).length,
  }

  const handleMarkAsRead = (id: number) => {
    console.log("Mark as read:", id)
  }

  const handleMarkAsUnread = (id: number) => {
    console.log("Mark as unread:", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      console.log("Delete notification:", id)
    }
  }

  const handleMarkAllAsRead = () => {
    console.log("Mark all as read")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated with all your tasks and project activities</p>
        </div>
        <Button onClick={handleMarkAllAsRead} className="bg-primary hover:bg-primary/90">
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold text-orange-600">{stats.unread}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <MarkAsUnread className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{stats.high}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today</p>
                <p className="text-2xl font-bold text-green-600">{stats.today}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="task">Tasks</SelectItem>
                <SelectItem value="reminder">Reminders</SelectItem>
                <SelectItem value="comment">Comments</SelectItem>
                <SelectItem value="project">Projects</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Notifications ({filteredNotifications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  notification.isRead ? "bg-background border-border" : "bg-accent border-accent-foreground/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4
                          className={`font-medium ${notification.isRead ? "text-muted-foreground" : "text-foreground"}`}
                        >
                          {notification.title}
                        </h4>
                        <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                          {notification.priority}
                        </Badge>
                        <Badge className={getTypeColor(notification.type)} variant="secondary">
                          {notification.type}
                        </Badge>
                      </div>
                      <p
                        className={`text-sm mb-2 ${notification.isRead ? "text-muted-foreground" : "text-foreground"}`}
                      >
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>From: {notification.sender}</span>
                        <span>Project: {notification.project}</span>
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {notification.isRead ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsUnread(notification.id)}
                        className="text-xs"
                      >
                        <MarkAsUnread className="w-3 h-3 mr-1" />
                        Unread
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-xs"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Read
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(notification.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
