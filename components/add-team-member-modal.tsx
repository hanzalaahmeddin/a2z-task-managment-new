"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Upload, User, Eye, EyeOff } from "lucide-react"
import { format } from "date-fns"

interface AddTeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  departments: Array<{ id: number; name: string }>
}

const userRoles = [
  { id: "super_admin", label: "Super Admin", description: "Full system access" },
  { id: "team_lead", label: "Team Lead", description: "Manage team and projects" },
  { id: "project_manager", label: "Project Manager", description: "Manage projects and tasks" },
  { id: "employee", label: "Employee", description: "Basic task management" },
]

const permissions = [
  { id: "create_tasks", label: "Create Tasks", description: "Can create new tasks" },
  { id: "assign_tasks", label: "Assign Tasks", description: "Can assign tasks to team members" },
  { id: "edit_tasks", label: "Edit Tasks", description: "Can edit existing tasks" },
  { id: "delete_tasks", label: "Delete Tasks", description: "Can delete tasks" },
  { id: "manage_team", label: "Manage Team", description: "Can add/edit/remove team members" },
  { id: "manage_departments", label: "Manage Departments", description: "Can create and manage departments" },
  { id: "view_reports", label: "View Reports", description: "Can access reports and analytics" },
  { id: "manage_projects", label: "Manage Projects", description: "Can create and manage projects" },
  { id: "approve_tasks", label: "Approve Tasks", description: "Can approve and review tasks" },
  { id: "manage_settings", label: "Manage Settings", description: "Can access system settings" },
]

export function AddTeamMemberModal({ isOpen, onClose, departments }: AddTeamMemberModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "Active",
    salary: "",
    address: "",
    emergencyContact: "",
    skills: "",
    username: "",
    password: "",
    userRole: "",
  })
  const [joinDate, setJoinDate] = useState<Date>()
  const [profileImage, setProfileImage] = useState<string>("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Auto-generate username from email
    if (field === "email") {
      const username = value.split("@")[0]
      setFormData((prev) => ({ ...prev, username }))
    }
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions((prev) => [...prev, permissionId])
    } else {
      setSelectedPermissions((prev) => prev.filter((id) => id !== permissionId))
    }
  }

  const handleUserRoleChange = (role: string) => {
    setFormData((prev) => ({ ...prev, userRole: role }))

    // Auto-assign permissions based on role
    switch (role) {
      case "super_admin":
        setSelectedPermissions(permissions.map((p) => p.id))
        break
      case "team_lead":
        setSelectedPermissions([
          "create_tasks",
          "assign_tasks",
          "edit_tasks",
          "manage_team",
          "view_reports",
          "manage_projects",
          "approve_tasks",
        ])
        break
      case "project_manager":
        setSelectedPermissions([
          "create_tasks",
          "assign_tasks",
          "edit_tasks",
          "view_reports",
          "manage_projects",
          "approve_tasks",
        ])
        break
      case "employee":
        setSelectedPermissions(["view_reports"])
        break
      default:
        setSelectedPermissions([])
    }
  }

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData((prev) => ({ ...prev, password }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      ...formData,
      joinDate,
      profileImage,
      permissions: selectedPermissions,
    })

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      status: "Active",
      salary: "",
      address: "",
      emergencyContact: "",
      skills: "",
      username: "",
      password: "",
      userRole: "",
    })
    setJoinDate(undefined)
    setProfileImage("")
    setSelectedPermissions([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center">
            <User className="w-5 h-5 mr-2" />
            Add New Team Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center border-2 border-dashed border-border">
                {profileImage ? (
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-transparent"
                onClick={() => setProfileImage("/placeholder.svg?height=96&width=96&text=Profile")}
              >
                Upload Photo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter first name"
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter last name"
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email address"
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter phone number"
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-foreground">
                      Job Role *
                    </Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      placeholder="e.g., Senior Developer"
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-foreground">
                      Department *
                    </Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleInputChange("department", value)}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Select department" />
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Join Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-background border-border text-foreground hover:bg-accent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {joinDate ? format(joinDate, "PPP") : "Select join date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card border-border">
                        <Calendar mode="single" selected={joinDate} onSelect={setJoinDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-foreground">
                      Salary
                    </Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => handleInputChange("salary", e.target.value)}
                      placeholder="e.g., $50,000"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Login Credentials */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Login Credentials</h3>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground">
                    Username *
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Auto-generated from email"
                    className="bg-background border-border text-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password *
                  </Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter password"
                        className="bg-background border-border text-foreground pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <Button type="button" variant="outline" onClick={generatePassword}>
                      Generate
                    </Button>
                  </div>
                </div>
              </div>

              {/* User Role */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">User Role & Access</h3>
                <div className="space-y-2">
                  <Label htmlFor="userRole" className="text-foreground">
                    User Role *
                  </Label>
                  <Select value={formData.userRole} onValueChange={handleUserRoleChange}>
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {userRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          <div className="flex flex-col">
                            <span>{role.label}</span>
                            <span className="text-xs text-muted-foreground">{role.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Permissions</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto border border-border rounded-lg p-4">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={permission.id} className="text-sm font-medium text-foreground cursor-pointer">
                          {permission.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
              Add Team Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
