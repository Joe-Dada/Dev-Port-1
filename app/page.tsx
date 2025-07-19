import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">Discord Verification</CardTitle>
          <CardDescription className="text-gray-600">Verify your Discord account to access the server</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button asChild className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            <Link href="/verify">Start Verification</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
