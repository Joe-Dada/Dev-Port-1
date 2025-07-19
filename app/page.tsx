import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Shield, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-100 rounded-full">
              <Bot className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discord Bot
            <span className="text-indigo-600"> Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage your Discord server with powerful automation, role management, and OAuth2 integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/auth/discord">Connect Discord Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-2 bg-green-100 rounded-lg w-fit">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>
                Automatically assign and manage roles based on user actions and verification.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Automatic role assignment</li>
                <li>• Custom role hierarchies</li>
                <li>• Permission management</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-2 bg-blue-100 rounded-lg w-fit">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>OAuth2 Integration</CardTitle>
              <CardDescription>Secure Discord OAuth2 authentication for seamless user verification.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Secure authentication</li>
                <li>• User profile access</li>
                <li>• Server integration</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-2 bg-purple-100 rounded-lg w-fit">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Real-time Webhooks</CardTitle>
              <CardDescription>Handle Discord events in real-time with webhook integration.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Event processing</li>
                <li>• Real-time updates</li>
                <li>• Custom responses</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Status Section */}
        <div className="text-center">
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Bot Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Online
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Servers</span>
                  <Badge variant="outline">0 Connected</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <Badge variant="outline">99.9%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
