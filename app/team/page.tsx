"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Building2, Search, Edit, Trash2, Mail, Phone, Calendar } from "lucide-react"
import { Header } from "@/components/header"
import { AddTeamMemberModal } from "@/components/add-team-member-modal"
import { AddDepartmentModal } from "@/components/add-department-modal"
import { EditTeamMemberModal } from "@/components/edit-team-member-modal"
import { EditDepartmentModal } from "@/components/edit-department-modal"

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 234 567 8901",
    role: "Senior Designer",
    department: "Design Department",
    status: "Active",
    joinDate: "2023-01-15",
    tasksAssigned: 15,
    tasksCompleted: 12,
    avatar: "JD",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    phone: "+1 234 567 8902",
    role: "Frontend Developer",
    department: "Development Department",
    status: "Active",
    joinDate: "2023-02-20",
    tasksAssigned: 12,
    tasksCompleted: 8,
    avatar: "JS",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    phone: "+1 234 567 8903",
    role: "Backend Developer",
    department: "Development Department",
    status: "Active",
    joinDate: "2023-03-10",
    tasksAssigned: 18,
    tasksCompleted: 15,
    avatar: "MJ",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 234 567 8904",
    role: "Database Administrator",
    department: "Development Department",
    status: "Active",
    joinDate: "2023-04-05",
    tasksAssigned: 14,
    tasksCompleted: 10,
    avatar: "SW",
  },
  {
    id: 5,
    name: "Alex Brown",
    email: "alex.brown@company.com",
    phone: "+1 234 567 8905",
    role: "Server Administrator",
    department: "Hosting Support",
    status: "Active",
    joinDate: "2023-05-12",
    tasksAssigned: 10,
    tasksCompleted: 8,
    avatar: "AB",
  },
  {
    id: 6,
    name: "Lisa Chen",
    email: "lisa.chen@company.com",
    phone: "+1 234 567 8906",
    role: "UI/UX Designer",
    department: "Design Department",
    status: "Inactive",
    joinDate: "2023-06-18",
    tasksAssigned: 8,
    tasksCompleted: 6,
    avatar: "LC",
  },
]

const departments = [
  {
    id: 1,
    name: "Design Department",
    description: "Responsible for UI/UX design, branding, and visual content creation",
    head: "John Doe",
    employees: 8,
    activeProjects: 5,
    completionRate: 85,
    budget: "$50,000",
    createdDate: "2023-01-01",
  },
  {
    id: 2,
    name: "Development Department",
    description: "Handles software development, coding, and technical implementation",
    head: "Jane Smith",
    employees: 12,
    activeProjects: 8,
    completionRate: 78,
    budget: "$80,000",
    createdDate: "2023-01-01",
  },
  {
    id: 3,
    name: "Hosting Support",
    description: "Manages server infrastructure, hosting, and technical support",
    head: "Alex Brown",
    employees: 4,
    activeProjects: 3,
    completionRate: 92,
    budget: "$30,000",
    createdDate: "2023-01-01",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    case "Inactive":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
  }
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false)
  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false)
  const [editDepartmentModalOpen, setEditDepartmentModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null)

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter
    const matchesStatus = statusFilter === "all" || member.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleEditMember = (member: any) => {
    setSelectedMember(member)
    setEditMemberModalOpen(true)
  }

  const handleUpdateMember = (updatedMember: any) => {
    console.log("Member updated:", updatedMember)
  }

  const handleDeleteMember = (memberId: number) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      console.log("Member deleted:", memberId)
    }
  }

  const handleEditDepartment = (department: any) => {
    setSelectedDepartment(department)
    setEditDepartmentModalOpen(true)
  }

  const handleUpdateDepartment = (updatedDepartment: any) => {
    console.log("Department updated:", updatedDepartment)
  }

  const handleDeleteDepartment = (departmentId: number) => {
    if (confirm("Are you sure you want to delete this department?")) {
      console.log("Department deleted:", departmentId)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
            <p className="text-muted-foreground mt-1">Manage team members and departments</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => setIsAddDepartmentModalOpen(true)} variant="outline">
              <Building2 className="w-4 h-4 mr-2" />
              Add Department
            </Button>
            <Button onClick={() => setIsAddMemberModalOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </div>

        {/* Team Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold text-foreground">{teamMembers.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                  <p className="text-2xl font-bold text-green-600">
                    {teamMembers.filter((m) => m.status === "Active").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Departments</p>
                  <p className="text-2xl font-bold text-foreground">{departments.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Completion</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(departments.reduce((acc, dept) => acc + dept.completionRate, 0) / departments.length)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            {/* Filters */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background border-border"
                    />
                  </div>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.name}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Team Members Table */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Team Members ({filteredMembers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Member</TableHead>
                      <TableHead className="text-muted-foreground">Role</TableHead>
                      <TableHead className="text-muted-foreground">Department</TableHead>
                      <TableHead className="text-muted-foreground">Contact</TableHead>
                      <TableHead className="text-muted-foreground">Tasks</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id} className="border-border hover:bg-accent/50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-primary-foreground">{member.avatar}</span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{member.name}</p>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                Joined {member.joinDate}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">{member.role}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-background">
                            {member.department}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm text-foreground flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {member.email}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {member.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm text-foreground">Assigned: {member.tasksAssigned}</p>
                            <p className="text-sm text-green-600">Completed: {member.tasksCompleted}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditMember(member)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteMember(member.id)}
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((department) => (
                <Card key={department.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-foreground">{department.name}</CardTitle>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" onClick={() => handleEditDepartment(department)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDepartment(department.id)}
                          className="text-red-600 hover:text-red-700 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{department.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Department Head</p>
                        <p className="font-medium text-foreground">{department.head}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Employees</p>
                        <p className="font-medium text-foreground">{department.employees}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Projects</p>
                        <p className="font-medium text-foreground">{department.activeProjects}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {department.completionRate}%
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-medium text-foreground">{department.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Created</p>
                        <p className="text-sm text-muted-foreground">{department.createdDate}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">{department.completionRate}%</span>
                      </div>
                      <div className="w-full bg-accent rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${department.completionRate}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <AddTeamMemberModal
          isOpen={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
          departments={departments}
        />
        <AddDepartmentModal isOpen={isAddDepartmentModalOpen} onClose={() => setIsAddDepartmentModalOpen(false)} />
        <EditTeamMemberModal
          isOpen={editMemberModalOpen}
          onClose={() => setEditMemberModalOpen(false)}
          member={selectedMember}
          departments={departments}
          onUpdate={handleUpdateMember}
        />
        <EditDepartmentModal
          isOpen={editDepartmentModalOpen}
          onClose={() => setEditDepartmentModalOpen(false)}
          department={selectedDepartment}
          onUpdate={handleUpdateDepartment}
        />
      </div>
    </div>
  )
}
