"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Edit,
  Save,
  X,
  Camera,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"

const userProfile = {
  id: 1,
  name: "John Doe",
  email: "john.doe@company.com",
  phone: "+92-300-1234567",
  address: "123 Main Street, Karachi, Pakistan",
  role: "Senior Designer",
  department: "Design Department",
  employeeId: "EMP-001",
  joinDate: "2023-01-15",
  avatar: "/placeholder.svg?height=100&width=100&text=JD",
  bio: "Experienced designer with 5+ years in UI/UX design. Passionate about creating user-friendly interfaces and improving user experience.",
  skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
  manager: "Sarah Wilson",
  workLocation: "Karachi Office",
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+92-300-7654321",
  },
}

const userStats = {
  totalTasks: 45,
  completedTasks: 38,
  inProgressTasks: 5,
  pendingTasks: 2,
  completionRate: 84,
  averageRating: 4.7,
  projectsWorked: 12,
  hoursLogged: 320,
}

const recentTasks = [
  {
    id: 1,
    title: "Design Homepage Mockup",
    status: "Completed",
    completedDate: "2024-01-10",
    project: "State Life Website Redesign",
  },
  {
    id: 2,
    title: "Create User Flow Diagram",
    status: "In Progress",
    dueDate: "2024-01-15",
    project: "A2Z Creatorz Mobile App",
  },
  {
    id: 3,
    title: "Update Brand Guidelines",
    status: "Completed",
    completedDate: "2024-01-08",
    project: "Tech Solutions Branding",
  },
]

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Only super admin can save changes
    if (currentUser?.role === "Super Admin") {
      console.log("Profile updated:", editedProfile)
      setIsEditing(false)
    } else {
      alert("Only Super Admin can update profiles")
    }
  }

  const handleCancel = () => {
    setEditedProfile(userProfile)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
          <p className="text-muted-foreground mt-1">View and manage your profile information</p>
        </div>
        {currentUser.role === "Super Admin" && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} className="bg-primary hover:bg-primary/90">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={editedProfile.avatar || "/placeholder.svg"} alt={editedProfile.name} />
                    <AvatarFallback className="text-2xl">
                      {editedProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="text-center space-y-2">
                  {isEditing ? (
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="text-center font-semibold text-lg"
                    />
                  ) : (
                    <h2 className="text-xl font-semibold text-foreground">{editedProfile.name}</h2>
                  )}

                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {editedProfile.role}
                  </Badge>

                  <p className="text-sm text-muted-foreground">{editedProfile.department}</p>
                  <p className="text-sm text-muted-foreground">ID: {editedProfile.employeeId}</p>
                </div>

                <div className="w-full space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={editedProfile.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      <span className="text-foreground">{editedProfile.email}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={editedProfile.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      <span className="text-foreground">{editedProfile.phone}</span>
                    )}
                  </div>

                  <div className="flex items-start space-x-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    {isEditing ? (
                      <Textarea
                        value={editedProfile.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="text-sm"
                        rows={2}
                      />
                    ) : (
                      <span className="text-foreground">{editedProfile.address}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">Joined: {editedProfile.joinDate}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">Manager: {editedProfile.manager}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Performance Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                        <p className="text-2xl font-bold text-foreground">{userStats.totalTasks}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Completed</p>
                        <p className="text-2xl font-bold text-green-600">{userStats.completedTasks}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                        <p className="text-2xl font-bold text-blue-600">{userStats.inProgressTasks}</p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{userStats.pendingTasks}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bio Section */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">About</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={editedProfile.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                      className="bg-background border-border"
                    />
                  ) : (
                    <p className="text-muted-foreground">{editedProfile.bio}</p>
                  )}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {editedProfile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-accent text-accent-foreground">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.project}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {task.status === "Completed" ? `Completed: ${task.completedDate}` : `Due: ${task.dueDate}`}
                          </p>
                        </div>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Work Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground">Work Location</Label>
                      <p className="text-muted-foreground">{editedProfile.workLocation}</p>
                    </div>
                    <div>
                      <Label className="text-foreground">Projects Worked</Label>
                      <p className="text-muted-foreground">{userStats.projectsWorked}</p>
                    </div>
                    <div>
                      <Label className="text-foreground">Hours Logged</Label>
                      <p className="text-muted-foreground">{userStats.hoursLogged} hours</p>
                    </div>
                    <div>
                      <Label className="text-foreground">Average Rating</Label>
                      <p className="text-muted-foreground">{userStats.averageRating}/5.0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Contact Name</Label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.emergencyContact.name}
                          onChange={(e) =>
                            handleInputChange("emergencyContact", {
                              ...editedProfile.emergencyContact,
                              name: e.target.value,
                            })
                          }
                          className="bg-background border-border"
                        />
                      ) : (
                        <p className="text-muted-foreground">{editedProfile.emergencyContact.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Relationship</Label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.emergencyContact.relationship}
                          onChange={(e) =>
                            handleInputChange("emergencyContact", {
                              ...editedProfile.emergencyContact,
                              relationship: e.target.value,
                            })
                          }
                          className="bg-background border-border"
                        />
                      ) : (
                        <p className="text-muted-foreground">{editedProfile.emergencyContact.relationship}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.emergencyContact.phone}
                          onChange={(e) =>
                            handleInputChange("emergencyContact", {
                              ...editedProfile.emergencyContact,
                              phone: e.target.value,
                            })
                          }
                          className="bg-background border-border"
                        />
                      ) : (
                        <p className="text-muted-foreground">{editedProfile.emergencyContact.phone}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
