import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { mcUsername, discordUsername, email, items, totalAmount } = req.body;
  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

  if (!DISCORD_WEBHOOK_URL) {
    console.error('Missing DISCORD_WEBHOOK_URL environment variable');
    return res.status(500).json({ success: false, message: 'Server configuration error' });
  }

  const discordPayload = {
    username: "WoodMC Store Bot",
    embeds: [{
      title: "💎 NEW STORE PURCHASE",
      color: 16106024,
      fields: [
        { name: "👤 Minecraft User", value: `\`${mcUsername}\``, inline: true },
        { name: "💬 Discord User", value: `\`${discordUsername}\``, inline: true },
        { name: "📧 Email", value: email || 'N/A', inline: false },
        {
          name: "🛒 Items Ordered",
          value: items.map((i: any) => `- **${i.name}** (x${i.quantity})`).join('\n'),
          inline: false
        },
        { name: "💰 Total Paid", value: `**₹${totalAmount} INR**`, inline: true },
        { name: "⏰ Time", value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
      ],
      footer: { text: "WoodMC Automated Delivery System" },
      timestamp: new Date()
    }]
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    });

    if (!response.ok) {
      throw new Error(`Discord API responded with ${response.status}`);
    }

    return res.status(200).json({ success: true, message: 'Order processed successfully' });
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
