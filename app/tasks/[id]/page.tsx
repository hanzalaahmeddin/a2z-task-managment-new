"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, MessageSquare, Paperclip, User } from "lucide-react"
import Link from "next/link"

const taskData = {
  id: 1,
  title: "Design Homepage Mockup",
  priority: "High",
  dueDate: "2024-01-15",
  status: "In Progress",
  assignee: "John Doe",
  description:
    "Create a modern and responsive homepage mockup for the new company website. The design should include a hero section, features overview, testimonials, and a call-to-action section.",
  comments: [
    {
      id: 1,
      user: "Jane Smith",
      message: "Looking great so far! Can we adjust the color scheme?",
      time: "2 hours ago",
      avatar: "JS",
    },
    {
      id: 2,
      user: "Mike Johnson",
      message: "The layout is perfect. When will the mobile version be ready?",
      time: "4 hours ago",
      avatar: "MJ",
    },
  ],
  attachments: [
    { id: 1, name: "homepage-wireframe.pdf", size: "2.4 MB" },
    { id: 2, name: "design-assets.zip", size: "15.8 MB" },
  ],
}

export default function TaskDetails({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState(taskData.status)
  const [newComment, setNewComment] = useState("")

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
      case "Done":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Review":
        return "bg-purple-100 text-purple-800"
      case "To Do":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{taskData.title}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <Badge className={getPriorityColor(taskData.priority)}>{taskData.priority} Priority</Badge>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              Due: {taskData.dueDate}
            </div>
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-1" />
              {taskData.assignee}
            </div>
          </div>
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{taskData.description}</p>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Comments ({taskData.comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {taskData.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-800">{comment.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{comment.user}</span>
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{comment.message}</p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-2"
                />
                <Button size="sm">Post Comment</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={getStatusColor(status)} variant="secondary">
                {status}
              </Badge>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Paperclip className="w-5 h-5 mr-2" />
                Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {taskData.attachments.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                <Paperclip className="w-4 h-4 mr-2" />
                Add Attachment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
