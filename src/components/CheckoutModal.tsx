import React, { useState } from "react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutModalProps {
  items: CartItem[];
  total: number;
  onClose: () => void;
}

export default function CheckoutModal({ items, total, onClose }: CheckoutModalProps) {
  const [ign, setIgn] = useState("");
  const [discord, setDiscord] = useState("");
  const [email, setEmail] = useState("");
  const [billPreview, setBillPreview] = useState("");

  const generateBill = () => {
    const itemList = items
      .map((item) => `• ${item.name} x${item.quantity} - ₹${item.price}`)
      .join("\n");

    return `🧾 NEW PURCHASE REQUEST

Minecraft IGN: ${ign}
Discord Username: ${discord}
Email: ${email}

Items:
${itemList}

Total: ₹${total}

Payment Method: QR Code

Steps:
1. Scan the QR code and complete payment.
2. Click 'Copy Bill'.
3. Send the bill to the server owner on Discord.
4. After verification you will receive your item in-game.`;
  };

  const copyBill = () => {
    if (!ign || !discord || !email) {
      alert("Please fill IGN, Discord username and Email.");
      return;
    }

    const bill = generateBill();

    setBillPreview(bill);

    navigator.clipboard.writeText(bill);

    alert("Bill copied! Send it to the server owner on Discord.");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-[#0b0b0b] w-[520px] rounded-xl p-6 text-white relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">MANUAL CHECKOUT</h2>

        <p className="text-yellow-400 font-semibold mb-4">
          Total: ₹{total.toFixed(2)}
        </p>

        {/* USER DETAILS */}
        <div className="space-y-3 mb-4">
          <input
            type="text"
            placeholder="Minecraft IGN"
            value={ign}
            onChange={(e) => setIgn(e.target.value)}
            className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-700"
          />

          <input
            type="text"
            placeholder="Discord Username"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-700"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-700"
          />
        </div>

        {/* BILL PREVIEW */}
        <div className="bg-black border border-gray-800 rounded-lg p-4 text-sm mb-4 whitespace-pre-wrap">
          {billPreview || "Fill your details and click Copy Bill to generate your purchase request."}
        </div>

        {/* QR PAYMENT */}
        <div className="text-center mb-4">
          <p className="font-semibold mb-2">Scan QR to Pay</p>

          <img
            src="/QR/qr.png"
            alt="Payment QR"
            className="mx-auto w-44"
          />
        </div>

        {/* INSTRUCTIONS */}
        <p className="text-xs text-gray-400 text-center mb-5">
          Pay using the QR code above. After payment copy the bill and DM it
          to the server owner for verification. Once verified, your item will
          be delivered in-game.
        </p>

        {/* BUTTONS */}
        <button
          onClick={copyBill}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg"
        >
          Copy Bill
        </button>

        <a
          href="https://discord.com/users/OWNER_ID"
          target="_blank"
          rel="noreferrer"
        >
          <button className="w-full mt-3 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg">
            DM Owner on Discord
          </button>
        </a>
      </div>
    </div>
  );
}
