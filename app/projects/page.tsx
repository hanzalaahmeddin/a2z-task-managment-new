"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, Clock } from "lucide-react"
import { CreateProjectModal } from "@/components/create-project-modal"
import { EditProjectModal } from "@/components/edit-project-modal"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

const projects = [
  {
    id: 1,
    name: "Shopify Redesign",
    department: "Design Department",
    progress: 85,
    dueDate: "2024-02-15",
    team: ["John Doe", "Jane Smith"],
    status: "In Progress",
    tasks: { total: 12, completed: 10 },
  },
  {
    id: 2,
    name: "WordPress Plugin",
    department: "Development Department",
    progress: 60,
    dueDate: "2024-02-28",
    team: ["Mike Johnson", "Sarah Wilson"],
    status: "In Progress",
    tasks: { total: 8, completed: 5 },
  },
  {
    id: 3,
    name: "Server Maintenance",
    department: "Website Hosting Support",
    progress: 100,
    dueDate: "2024-01-30",
    team: ["Alex Brown"],
    status: "Completed",
    tasks: { total: 5, completed: 5 },
  },
  {
    id: 4,
    name: "Mobile App UI",
    department: "Design Department",
    progress: 40,
    dueDate: "2024-03-10",
    team: ["John Doe", "Lisa Chen"],
    status: "In Progress",
    tasks: { total: 15, completed: 6 },
  },
]

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

export default function Projects() {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const handleCreateProject = (newProject: any) => {
    console.log("Project created:", newProject)
  }

  const handleEditProject = (project: any) => {
    setSelectedProject(project)
    setEditModalOpen(true)
  }

  const handleUpdateProject = (updatedProject: any) => {
    console.log("Project updated:", updatedProject)
  }

  const handleDeleteProject = (projectId: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      console.log("Project deleted:", projectId)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track all your projects across departments</p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600">{project.department}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Due: {project.dueDate}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                {project.tasks.completed}/{project.tasks.total} tasks completed
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                {project.team.join(", ")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CreateProjectModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateProject}
      />
      <EditProjectModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        project={selectedProject}
        onUpdate={handleUpdateProject}
      />
    </div>
  )
}
