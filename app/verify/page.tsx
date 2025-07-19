"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ExternalLink, CheckCircle, XCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const status = searchParams.get("status")
    const errorParam = searchParams.get("error")

    if (status === "success") {
      setSuccess(true)
    } else if (errorParam) {
      switch (errorParam) {
        case "access_denied":
          setError("You denied the authorization. Please try again and accept the permissions.")
          break
        case "invalid_scope":
          setError("Some requested permissions are not available. Contact an administrator.")
          break
        case "token_failed":
          setError("Failed to exchange authorization code. Check your Discord app settings.")
          break
        case "user_failed":
          setError("Failed to get user information from Discord.")
          break
        case "no_code":
          setError("No authorization code received from Discord.")
          break
        case "callback_failed":
          setError("Callback processing failed. Please try again.")
          break
        default:
          setError(`Verification failed: ${errorParam}. Please try again.`)
      }
    }
  }, [searchParams])

  const handleVerify = () => {
    setIsLoading(true)
    setError("")

    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    if (!clientId) {
      setError("Configuration error. Please contact support.")
      setIsLoading(false)
      return
    }

    const redirectUri = `${window.location.origin}/api/auth/callback`
    const scopes = ["identify", "email", "guilds"]
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopes.join(" "))}`

    console.log("Redirecting to Discord OAuth:", authUrl)
    window.location.href = authUrl
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-800">Verified!</CardTitle>
            <CardDescription className="text-green-700">
              Your Discord account has been successfully verified
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Your information has been sent to the server. You can now close this window and return to Discord.
            </p>
            <Button onClick={() => window.close()} variant="outline" className="w-full">
              Close Window
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">Verify Account</CardTitle>
          <CardDescription className="text-gray-600">Click below to verify your Discord account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                Verify with Discord
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
