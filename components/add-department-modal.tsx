"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, DollarSign } from "lucide-react"

interface AddDepartmentModalProps {
  isOpen: boolean
  onClose: () => void
}

const availableHeads = [
  { id: 1, name: "John Doe", role: "Senior Designer" },
  { id: 2, name: "Jane Smith", role: "Frontend Developer" },
  { id: 3, name: "Mike Johnson", role: "Backend Developer" },
  { id: 4, name: "Sarah Wilson", role: "Database Administrator" },
  { id: 5, name: "Alex Brown", role: "Server Administrator" },
]

export function AddDepartmentModal({ isOpen, onClose }: AddDepartmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    head: "",
    budget: "",
    goals: "",
    responsibilities: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Reset form
    setFormData({
      name: "",
      description: "",
      head: "",
      budget: "",
      goals: "",
      responsibilities: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Create New Department
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Department Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Marketing Department"
                className="bg-background border-border text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the department's purpose and role"
                rows={3}
                className="bg-background border-border text-foreground"
                required
              />
            </div>
          </div>

          {/* Management Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Management</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="head" className="text-foreground">
                  Department Head *
                </Label>
                <Select value={formData.head} onValueChange={(value) => handleInputChange("head", value)}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select department head" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {availableHeads.map((person) => (
                      <SelectItem key={person.id} value={person.name}>
                        <div className="flex flex-col">
                          <span>{person.name}</span>
                          <span className="text-xs text-muted-foreground">{person.role}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-foreground">
                  Annual Budget
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    placeholder="50,000"
                    className="pl-10 bg-background border-border text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Goals and Responsibilities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Goals & Responsibilities</h3>

            <div className="space-y-2">
              <Label htmlFor="goals" className="text-foreground">
                Department Goals
              </Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => handleInputChange("goals", e.target.value)}
                placeholder="Key objectives and goals for this department"
                rows={3}
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities" className="text-foreground">
                Key Responsibilities
              </Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilities}
                onChange={(e) => handleInputChange("responsibilities", e.target.value)}
                placeholder="Main responsibilities and duties of this department"
                rows={4}
                className="bg-background border-border text-foreground"
              />
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
              Create Department
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
