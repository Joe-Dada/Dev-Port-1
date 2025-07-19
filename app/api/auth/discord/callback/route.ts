import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  console.log("Discord callback received:", { code: !!code, error })

  if (error) {
    console.error("Discord OAuth error:", error)
    return NextResponse.redirect(new URL(`/auth/discord?error=${error}`, request.url))
  }

  if (!code) {
    console.error("No code received from Discord")
    return NextResponse.redirect(new URL("/auth/discord?error=no_code", request.url))
  }

  try {
    // Construct proper redirect URI
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : request.nextUrl.origin
    const redirectUri = `${baseUrl}/api/auth/discord/callback`

    console.log("Using redirect URI:", redirectUri)

    // Exchange code for access token
    const tokenParams = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    })

    console.log("Exchanging code for token...")

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenParams,
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("Token exchange failed:", errorText)
      throw new Error(`Failed to exchange code for token: ${errorText}`)
    }

    const tokenData = await tokenResponse.json()
    console.log("Token received, scopes:", tokenData.scope)

    // Get user information
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      const errorText = await userResponse.text()
      console.error("User fetch failed:", errorText)
      throw new Error(`Failed to fetch user data: ${errorText}`)
    }

    const userData = await userResponse.json()
    console.log("User authenticated:", userData.username, userData.id)

    // Get user guilds
    const guildsResponse = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const guildsData = guildsResponse.ok ? await guildsResponse.json() : []
    console.log("User guilds:", guildsData.length)

    // Store user data (you can expand this to use a database)
    const userSession = {
      id: userData.id,
      username: userData.username,
      discriminator: userData.discriminator,
      avatar: userData.avatar,
      email: userData.email,
      guilds: guildsData,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      scopes: tokenData.scope.split(" "),
    }

    console.log("Authentication successful for user:", userData.username)

    // Create a response that redirects to dashboard
    const response = NextResponse.redirect(new URL("/dashboard?auth=success", request.url))

    // Set a cookie with user session (in production, use proper session management)
    response.cookies.set(
      "discord_session",
      JSON.stringify({
        id: userData.id,
        username: userData.username,
        avatar: userData.avatar,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    )

    return response
  } catch (error) {
    console.error("Discord OAuth error:", error)
    return NextResponse.redirect(
      new URL(`/auth/discord?error=auth_failed&details=${encodeURIComponent(error.message)}`, request.url),
    )
  }
}
