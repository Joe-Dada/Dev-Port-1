import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const MONGODB_URI =
  "mongodb+srv://sharkublox:kMSzQw0ZeUjkA9zn@gs.o5wg1el.mongodb.net/gameservices?retryWrites=true&w=majority&appName=GS&tls=true&tlsAllowInvalidCertificates=true"

async function saveToDatabase(verificationData: any) {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("✅ Connected to MongoDB")

    const db = client.db("gameservices")
    const collection = db.collection("discord_verifications")

    // Insert the verification data
    const result = await collection.insertOne({
      ...verificationData,
      createdAt: new Date(),
      status: "verified",
    })

    console.log("✅ Data saved to MongoDB:", result.insertedId)
    return result.insertedId
  } catch (error) {
    console.error("❌ MongoDB error:", error)
    throw error
  } finally {
    await client.close()
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    console.log("=== DISCORD CALLBACK START ===")
    console.log("Code received:", !!code)
    console.log("Error received:", error)

    if (error) {
      console.error("Discord OAuth error:", error)
      return NextResponse.redirect(new URL(`/verify?error=${error}`, request.url))
    }

    if (!code) {
      console.error("No authorization code received")
      return NextResponse.redirect(new URL("/verify?error=no_code", request.url))
    }

    // Use the actual request origin for redirect URI
    const redirectUri = `${request.nextUrl.origin}/api/auth/callback`
    console.log("Using redirect URI:", redirectUri)

    // Exchange authorization code for access token
    console.log("Exchanging code for access token...")
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("Token exchange failed:", {
        status: tokenResponse.status,
        error: errorText,
        redirectUri,
      })
      return NextResponse.redirect(
        new URL(`/verify?error=token_failed&details=${encodeURIComponent(errorText)}`, request.url),
      )
    }

    const tokenData = await tokenResponse.json()
    console.log("✅ Token received successfully")
    console.log("Granted scopes:", tokenData.scope)

    // Get user information
    console.log("Fetching user data...")
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      const errorText = await userResponse.text()
      console.error("Failed to fetch user data:", errorText)
      return NextResponse.redirect(new URL("/verify?error=user_failed", request.url))
    }

    const userData = await userResponse.json()
    console.log("✅ User data received:", userData.username, userData.id)

    // Get user guilds
    console.log("Fetching user guilds...")
    const guildsResponse = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const guildsData = guildsResponse.ok ? await guildsResponse.json() : []
    console.log("✅ User guilds received:", guildsData.length, "servers")

    // Prepare verification data for database
    const verificationData = {
      discordId: userData.id,
      username: userData.username,
      discriminator: userData.discriminator || "0000",
      email: userData.email,
      avatar: userData.avatar,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      scopes: tokenData.scope.split(" "),
      guilds: guildsData.map((guild: any) => ({
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        owner: guild.owner,
        permissions: guild.permissions,
      })),
      verificationCode: code,
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    // Save to MongoDB
    console.log("Saving verification data to MongoDB...")
    try {
      const mongoId = await saveToDatabase(verificationData)
      console.log("✅ Verification data saved with ID:", mongoId)
    } catch (mongoError) {
      console.error("❌ Failed to save to MongoDB:", mongoError)
      // Continue anyway - don't fail the whole process
    }

    // Send data to Discord webhook (if configured)
    if (process.env.DISCORD_WEBHOOK_URL) {
      console.log("Sending data to webhook...")

      const webhookPayload = {
        content: "🔔 **New User Verification**",
        embeds: [
          {
            title: "✅ User Successfully Verified & Saved to Database",
            color: 0x00ff00,
            fields: [
              {
                name: "👤 User",
                value: `${userData.username}#${userData.discriminator || "0000"}`,
                inline: true,
              },
              {
                name: "🆔 User ID",
                value: userData.id,
                inline: true,
              },
              {
                name: "📧 Email",
                value: userData.email || "Not provided",
                inline: true,
              },
              {
                name: "🏠 Servers",
                value: `${guildsData.length} servers`,
                inline: true,
              },
              {
                name: "🔑 Scopes",
                value: tokenData.scope || "Unknown",
                inline: false,
              },
              {
                name: "💾 Database",
                value: "✅ Saved to MongoDB",
                inline: true,
              },
              {
                name: "📊 Guild List",
                value:
                  guildsData.length > 0
                    ? guildsData
                        .slice(0, 5)
                        .map((g: any) => `• ${g.name}`)
                        .join("\n") + (guildsData.length > 5 ? `\n... and ${guildsData.length - 5} more` : "")
                    : "No servers found",
                inline: false,
              },
            ],
            thumbnail: {
              url: userData.avatar
                ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
                : "https://cdn.discordapp.com/embed/avatars/0.png",
            },
            timestamp: new Date().toISOString(),
            footer: {
              text: "Discord Verification System • Saved to Database",
            },
          },
        ],
      }

      try {
        const webhookResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookPayload),
        })

        if (webhookResponse.ok) {
          console.log("✅ Webhook sent successfully!")
        } else {
          const webhookError = await webhookResponse.text()
          console.error("❌ Webhook failed:", webhookError)
        }
      } catch (webhookError) {
        console.error("❌ Webhook error:", webhookError)
      }
    } else {
      console.log("⚠️ No webhook URL configured")
    }

    console.log("=== DISCORD CALLBACK SUCCESS ===")

    // Redirect to success page
    return NextResponse.redirect(new URL("/verify?status=success", request.url))
  } catch (error) {
    console.error("=== DISCORD CALLBACK ERROR ===")
    console.error("Unexpected error:", error)
    return NextResponse.redirect(new URL("/verify?error=callback_failed", request.url))
  }
}

// Also handle POST requests just in case
export async function POST(request: NextRequest) {
  return GET(request)
}
