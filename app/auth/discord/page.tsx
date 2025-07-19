"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ExternalLink } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function DiscordAuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      switch (errorParam) {
        case "access_denied":
          setError("Authorization was denied. Please try again.")
          break
        case "auth_failed":
          setError("Authentication failed. Please check your Discord application settings.")
          break
        case "no_code":
          setError("No authorization code received from Discord.")
          break
        default:
          setError(`Authentication error: ${errorParam}`)
      }
    }
  }, [searchParams])

  useEffect(() => {
    const errorParam = searchParams.get("error")
    const details = searchParams.get("details")

    if (errorParam) {
      let errorMessage = ""
      switch (errorParam) {
        case "access_denied":
          errorMessage = "Authorization was denied. Please try again and accept the permissions."
          break
        case "auth_failed":
          errorMessage = details
            ? `Authentication failed: ${decodeURIComponent(details)}`
            : "Authentication failed. Please check your Discord application settings."
          break
        case "no_code":
          errorMessage = "No authorization code received from Discord."
          break
        case "invalid_scope":
          errorMessage = "Invalid OAuth2 scope requested. Please contact support."
          break
        default:
          errorMessage = `Authentication error: ${errorParam}`
      }
      setError(errorMessage)
    }
  }, [searchParams])

  const handleDiscordAuth = () => {
    setIsLoading(true)
    setError(null)

    // Get Discord OAuth2 URL with comprehensive scopes
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    const redirectUri = `${window.location.origin}/api/auth/discord/callback`
    const scopes = ["identify", "email", "guilds"]

    if (!clientId) {
      setError("Discord client ID not configured")
      setIsLoading(false)
      return
    }

    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopes.join(" "))}&permissions=8`

    window.location.href = authUrl
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Connect Discord</CardTitle>
          <CardDescription>Authorize your Discord account to access bot features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <p className="text-sm text-gray-600">By connecting your Discord account, you'll be able to:</p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li>• Manage server roles</li>
              <li>• Access bot dashboard</li>
              <li>• Configure server settings</li>
              <li>• Configure server settings</li>
              <li>• View activity logs</li>
            </ul>
          </div>

          <Button onClick={handleDiscordAuth} disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                Connect with Discord
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">This will redirect you to Discord's authorization page</p>
          <div className="mt-4 text-center">
            <Button variant="link" asChild className="text-xs">
              <Link href="/debug">Debug OAuth2 Settings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
