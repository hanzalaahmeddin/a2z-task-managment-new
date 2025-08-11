"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckSquare, Eye, EyeOff, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"

const userAccounts = [
  {
    username: "superadmin",
    password: "admin123",
    role: "super_admin",
    name: "Super Admin",
    redirect: "/super-admin",
  },
  {
    username: "teamlead",
    password: "lead123",
    role: "team_lead",
    name: "Team Lead",
    redirect: "/team-lead",
  },
  {
    username: "john.doe",
    password: "john123",
    role: "employee",
    name: "John Doe",
    redirect: "/employee",
  },
  {
    username: "jane.smith",
    password: "jane123",
    role: "project_manager",
    name: "Jane Smith",
    redirect: "/",
  },
]

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = userAccounts.find(
      (account) =>
        account.username === formData.username &&
        account.password === formData.password &&
        (formData.role === "" || account.role === formData.role),
    )

    if (user) {
      // Store user session
      localStorage.setItem("currentUser", JSON.stringify(user))
      router.push(user.redirect)
    } else {
      setError("Invalid credentials or role selection")
    }

    setLoading(false)
  }

  const handleDemoLogin = (account: (typeof userAccounts)[0]) => {
    setFormData({
      username: account.username,
      password: account.password,
      role: account.role,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <CheckSquare className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">A2Z Creatorz TaskFlow Pro</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-foreground">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  placeholder="Enter your username"
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter your password"
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-foreground">
                  Login As (Optional)
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select role (optional)" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="team_lead">Team Lead</SelectItem>
                    <SelectItem value="project_manager">Project Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && <div className="text-red-600 text-sm text-center">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-center text-foreground text-sm">Demo Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {userAccounts.map((account) => (
              <Button
                key={account.username}
                variant="outline"
                className="w-full justify-start bg-background border-border text-foreground hover:bg-accent"
                onClick={() => handleDemoLogin(account)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{account.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {account.username} / {account.password}
                  </span>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 TaskFlow Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
