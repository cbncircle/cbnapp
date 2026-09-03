// lib/telegramNotifier.ts

export async function sendTelegramMessage(chatId: string, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN; // Token server-side রাখা উচিত

  if (!token) {
    console.error("TELEGRAM_BOT_TOKEN is not set");
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
}
