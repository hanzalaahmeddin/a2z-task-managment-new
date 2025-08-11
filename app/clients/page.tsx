"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Building2, FolderOpen, Users, Clock } from "lucide-react"
import { CreateClientModal } from "@/components/create-client-modal"
import { EditClientModal } from "@/components/edit-client-modal"
import Image from "next/image"

const clients = [
  {
    id: 1,
    name: "State Life Insurance",
    logo: "/placeholder.svg?height=60&width=60&text=SL",
    email: "contact@statelife.com",
    phone: "+92-21-1234567",
    address: "Karachi, Pakistan",
    status: "Active",
    projectsCount: 3,
    totalTasks: 45,
    completedTasks: 32,
    activeEmployees: 8,
    joinedDate: "2024-01-15",
    industry: "Insurance",
    contactPerson: "Ahmed Ali",
  },
  {
    id: 2,
    name: "A2Z Creatorz",
    logo: "/images/a2zcreatorz-logo.png",
    email: "info@a2zcreatorz.com",
    phone: "+92-42-9876543",
    address: "Lahore, Pakistan",
    status: "Active",
    projectsCount: 2,
    totalTasks: 28,
    completedTasks: 20,
    activeEmployees: 5,
    joinedDate: "2024-02-01",
    industry: "Digital Marketing",
    contactPerson: "Sarah Khan",
  },
  {
    id: 3,
    name: "Tech Solutions Ltd",
    logo: "/placeholder.svg?height=60&width=60&text=TS",
    email: "hello@techsolutions.com",
    phone: "+92-51-5555555",
    address: "Islamabad, Pakistan",
    status: "Active",
    projectsCount: 1,
    totalTasks: 15,
    completedTasks: 12,
    activeEmployees: 3,
    joinedDate: "2024-01-20",
    industry: "Technology",
    contactPerson: "Muhammad Hassan",
  },
  {
    id: 4,
    name: "Green Energy Corp",
    logo: "/placeholder.svg?height=60&width=60&text=GE",
    email: "contact@greenenergy.com",
    phone: "+92-42-7777777",
    address: "Lahore, Pakistan",
    status: "Inactive",
    projectsCount: 0,
    totalTasks: 0,
    completedTasks: 0,
    activeEmployees: 0,
    joinedDate: "2023-12-10",
    industry: "Energy",
    contactPerson: "Fatima Sheikh",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    case "Inactive":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
  }
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateClient = (newClient: any) => {
    console.log("Client created:", newClient)
  }

  const handleEditClient = (client: any) => {
    setSelectedClient(client)
    setEditModalOpen(true)
  }

  const handleUpdateClient = (updatedClient: any) => {
    console.log("Client updated:", updatedClient)
  }

  const handleDeleteClient = (clientId: number) => {
    if (
      confirm("Are you sure you want to delete this client? This will also delete all associated projects and tasks.")
    ) {
      console.log("Client deleted:", clientId)
    }
  }

  const totalStats = {
    totalClients: clients.length,
    activeClients: clients.filter((c) => c.status === "Active").length,
    totalProjects: clients.reduce((sum, c) => sum + c.projectsCount, 0),
    totalTasks: clients.reduce((sum, c) => sum + c.totalTasks, 0),
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Client Management</h1>
          <p className="text-muted-foreground mt-1">Manage your clients and track their projects</p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold text-foreground">{totalStats.totalClients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.activeClients}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold text-purple-600">{totalStats.totalProjects}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold text-orange-600">{totalStats.totalTasks}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search clients by name, industry, or contact person..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={`${client.name} logo`}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-foreground">{client.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{client.industry}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" onClick={() => handleEditClient(client)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClient(client.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Projects</p>
                  <p className="font-medium text-foreground">{client.projectsCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tasks</p>
                  <p className="font-medium text-foreground">{client.totalTasks}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground">Completion Rate</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${client.totalTasks > 0 ? (client.completedTasks / client.totalTasks) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="font-medium text-foreground">
                    {client.totalTasks > 0 ? Math.round((client.completedTasks / client.totalTasks) * 100) : 0}%
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="text-sm space-y-1">
                  <p className="text-muted-foreground">Contact: {client.contactPerson}</p>
                  <p className="text-muted-foreground">Email: {client.email}</p>
                  <p className="text-muted-foreground">Phone: {client.phone}</p>
                  <p className="text-muted-foreground">Joined: {client.joinedDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateClientModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateClient}
      />
      <EditClientModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        client={selectedClient}
        onUpdate={handleUpdateClient}
      />
    </div>
  )
}
