"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw } from "lucide-react"

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Get client-side environment variables
    setEnvVars({
      NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "Not set",
      "Current Origin": window.location.origin,
      "Expected Redirect URI": `${window.location.origin}/api/auth/discord/callback`,
    })
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const testOAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    const redirectUri = `${window.location.origin}/api/auth/discord/callback`
    const scopes = ["identify", "email", "guilds"]

    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopes.join(" "))}&permissions=8`

    window.open(authUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discord OAuth2 Debug</h1>
          <p className="text-gray-600">Debug information for Discord authentication</p>
        </div>

        <div className="grid gap-6">
          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Current environment configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(envVars).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{key}</p>
                      <p className="text-xs text-gray-600 font-mono">{value}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(value)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {copied && <p className="text-sm text-green-600 mt-2">Copied to clipboard!</p>}
            </CardContent>
          </Card>

          {/* OAuth2 Scopes */}
          <Card>
            <CardHeader>
              <CardTitle>OAuth2 Scopes</CardTitle>
              <CardDescription>Required Discord permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["identify", "email", "guilds"].map((scope) => (
                  <Badge key={scope} variant="secondary">
                    {scope}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Test OAuth */}
          <Card>
            <CardHeader>
              <CardTitle>Test OAuth2 Flow</CardTitle>
              <CardDescription>Test the Discord authentication in a new window</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={testOAuth} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Test OAuth2 Flow
              </Button>
            </CardContent>
          </Card>

          {/* Discord Setup Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Discord Application Checklist</CardTitle>
              <CardDescription>Verify your Discord application settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span className="text-sm">Bot created in Discord Developer Portal</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span className="text-sm">
                    OAuth2 redirect URI set to:{" "}
                    <code className="bg-gray-100 px-1 rounded text-xs">{envVars["Expected Redirect URI"]}</code>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span className="text-sm">All required scopes enabled in OAuth2 settings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span className="text-sm">Bot permissions include "Administrator" or specific permissions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span className="text-sm">Environment variables set in Vercel dashboard</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
