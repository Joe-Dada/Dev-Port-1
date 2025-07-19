import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Verify Discord webhook signature
function verifySignature(body: string, signature: string, timestamp: string): boolean {
  const publicKey = process.env.DISCORD_PUBLIC_KEY
  if (!publicKey) return false

  try {
    const isVerified = crypto.verify(
      "sha256",
      Buffer.from(timestamp + body),
      {
        key: publicKey,
        format: "hex",
      },
      signature,
    )
    return isVerified
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-signature-ed25519")
    const timestamp = request.headers.get("x-signature-timestamp")

    if (!signature || !timestamp) {
      return NextResponse.json({ error: "Missing signature headers" }, { status: 401 })
    }

    // Verify the request is from Discord
    if (!verifySignature(body, signature, timestamp)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const data = JSON.parse(body)

    // Handle Discord interaction types
    switch (data.type) {
      case 1: // PING
        return NextResponse.json({ type: 1 })

      case 2: // APPLICATION_COMMAND
        return handleApplicationCommand(data)

      case 3: // MESSAGE_COMPONENT
        return handleMessageComponent(data)

      default:
        return NextResponse.json({ error: "Unknown interaction type" }, { status: 400 })
    }
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleApplicationCommand(interaction: any) {
  const { data: commandData, member, guild_id } = interaction

  switch (commandData.name) {
    case "verify":
      return NextResponse.json({
        type: 4,
        data: {
          content: `Hello ${member.user.username}! Please visit our verification page to complete the process.`,
          flags: 64, // EPHEMERAL
        },
      })

    case "roles":
      return NextResponse.json({
        type: 4,
        data: {
          content: "Here are your available roles...",
          flags: 64,
        },
      })

    default:
      return NextResponse.json({
        type: 4,
        data: {
          content: "Unknown command!",
          flags: 64,
        },
      })
  }
}

async function handleMessageComponent(interaction: any) {
  const { data: componentData, member } = interaction

  // Handle button clicks, select menus, etc.
  return NextResponse.json({
    type: 4,
    data: {
      content: "Component interaction handled!",
      flags: 64,
    },
  })
}
