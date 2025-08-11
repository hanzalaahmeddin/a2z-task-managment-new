"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Edit } from "lucide-react"
import { format } from "date-fns"

interface Project {
  id: number
  name: string
  department: string
  progress: number
  dueDate: string
  team: string[]
  status: string
  tasks: { total: number; completed: number }
}

interface EditProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
  onUpdate: (updatedProject: Project) => void
}

const teamMembers = [
  { id: 1, name: "John Doe", role: "Senior Designer" },
  { id: 2, name: "Jane Smith", role: "Frontend Developer" },
  { id: 3, name: "Mike Johnson", role: "Backend Developer" },
  { id: 4, name: "Sarah Wilson", role: "Database Administrator" },
  { id: 5, name: "Alex Brown", role: "Server Administrator" },
  { id: 6, name: "Lisa Chen", role: "UI/UX Designer" },
]

const departments = [
  { id: 1, name: "Design Department" },
  { id: 2, name: "Development Department" },
  { id: 3, name: "Website Hosting Support" },
]

export function EditProjectModal({ isOpen, onClose, project, onUpdate }: EditProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    department: "",
    priority: "Medium",
    status: "Planning",
    budget: "",
    client: "",
  })
  const [startDate, setStartDate] = useState<Date>()
  const [dueDate, setDueDate] = useState<Date>()
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<number[]>([])

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: "",
        department: project.department,
        priority: "Medium",
        status: project.status,
        budget: "",
        client: "",
      })
      setDueDate(new Date(project.dueDate))

      // Set selected team members based on project.team
      const selectedIds = teamMembers.filter((member) => project.team.includes(member.name)).map((member) => member.id)
      setSelectedTeamMembers(selectedIds)
    }
  }, [project])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTeamMemberToggle = (memberId: number) => {
    setSelectedTeamMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (project) {
      const selectedMembers = teamMembers.filter((member) => selectedTeamMembers.includes(member.id))

      const updatedProject: Project = {
        ...project,
        name: formData.name,
        department: formData.department,
        status: formData.status,
        dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : project.dueDate,
        team: selectedMembers.map((member) => member.name),
      }

      onUpdate(updatedProject)
      onClose()
    }
  }

  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center">
            <Edit className="w-5 h-5 mr-2" />
            Edit Project
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Project Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Project Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-background border-border text-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter project description"
                    rows={4}
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-foreground">
                      Department *
                    </Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleInputChange("department", value)}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-foreground">
                      Status
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-background border-border text-foreground hover:bg-accent"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Select due date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-border">
                      <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Team Assignment */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto border border-border rounded-lg p-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={`member-${member.id}`}
                        checked={selectedTeamMembers.includes(member.id)}
                        onCheckedChange={() => handleTeamMemberToggle(member.id)}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={`member-${member.id}`}
                          className="text-sm font-medium text-foreground cursor-pointer"
                        >
                          {member.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Selected: {selectedTeamMembers.length} team member(s)</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-background border-border text-foreground hover:bg-accent"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Update Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
