import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { message } = await req.json()
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.ADMIN_CHAT_ID

  if (!token || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or ADMIN_CHAT_ID")
    return NextResponse.json({ error: 'Telegram config missing' }, { status: 500 })
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      }),
    })

    const data = await response.json()

    // Telegram API সত্যিই সফলভাবে মেসেজ পাঠিয়েছে কিনা চেক করুন
    if (!data.ok) {
      console.error("Telegram API Error:", data)
      return NextResponse.json({ error: 'Telegram API error: ' + data.description }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error("Error sending Telegram message:", error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
