import { type NextRequest, NextResponse } from "next/server"

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1349090248558252083/SnqV35xGK77moLAMqLEmZd2kVqre8lL8giMun7uu5pigSYLoy1tfAi1P_Vpx_fP_umxi"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const embed = {
      title: "🚀 New Project Inquiry",
      color: 0x00d4ff,
      fields: [
        {
          name: "👤 Client Info",
          value: `**Name:** ${data.name}\n**Email:** ${data.email}\n**Company:** ${data.company || "Not specified"}`,
          inline: false,
        },
        {
          name: "📋 Project Details",
          value: `**Type:** ${data.projectType}\n**Budget:** ${data.budget}\n**Timeline:** ${data.timeline}`,
          inline: false,
        },
        {
          name: "📝 Description",
          value: data.description,
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Portfolio Contact Form",
      },
    }

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send to Discord")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending to Discord:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
