import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- CONFIGURATION ---
// Add your Discord Webhook URL in a .env file as DISCORD_WEBHOOK_URL
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';

app.use(cors());
app.use(express.json());

app.post('/api/checkout', async (req, res) => {
    const { mcUsername, discordUsername, email, items, totalAmount, timestamp } = req.body;

    console.log(`📦 New Order: ${mcUsername} (${discordUsername}) - ₹${totalAmount}`);

    // Formatted Discord Embed
    const discordPayload = {
        username: "WoodMC Store Bot",
        avatar_url: "https://play.woodmc.fun/logo.png", // Replace with actual logo URL
        embeds: [{
            title: "💎 NEW STORE PURCHASE",
            color: 16106024, // WoodMC Gold
            fields: [
                { name: "👤 Minecraft User", value: `\`${mcUsername}\``, inline: true },
                { name: "💬 Discord User", value: `\`${discordUsername}\``, inline: true },
                { name: "📧 Email", value: email, inline: false },
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
        if (DISCORD_WEBHOOK_URL) {
            await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discordPayload)
            });
            console.log('✅ Data sent to Discord Bot');
        } else {
            console.warn('⚠️ No DISCORD_WEBHOOK_URL configured. Order logged to console only.');
        }

        res.status(200).json({
            success: true,
            message: 'Order processed successfully.'
        });
    } catch (error) {
        console.error('❌ Failed to alert Discord Bot:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 Store API Engine Running`);
    console.log(`📍 Endpoint: http://localhost:${PORT}/api/checkout`);
    console.log(`🛠️ Mode: ${DISCORD_WEBHOOK_URL ? 'Production (Discord Linked)' : 'Development (Console Only)'}\n`);
});
