import { type NextRequest, NextResponse } from "next/server"

const DISCORD_API_BASE = "https://discord.com/api/v10"

export async function POST(request: NextRequest) {
  try {
    const { guildId } = await request.json()

    if (!guildId) {
      return NextResponse.json({ error: "Guild ID required" }, { status: 400 })
    }

    const commands = [
      {
        name: "verify",
        description: "Start the verification process",
        type: 1,
      },
      {
        name: "roles",
        description: "View available roles",
        type: 1,
      },
      {
        name: "status",
        description: "Check bot status",
        type: 1,
      },
    ]

    // Register commands with Discord
    const response = await fetch(
      `${DISCORD_API_BASE}/applications/${process.env.DISCORD_CLIENT_ID}/guilds/${guildId}/commands`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commands),
      },
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to register commands: ${error}`)
    }

    const result = await response.json()
    return NextResponse.json({ success: true, commands: result })
  } catch (error) {
    console.error("Command registration error:", error)
    return NextResponse.json({ error: "Failed to register commands" }, { status: 500 })
  }
}
