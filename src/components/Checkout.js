import React from "react";
import { Typography, Button } from "@mui/material";

export default function Checkout({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const message = encodeURIComponent(
    `Hi, I want to order:\n${cart.map((c) => `${c.name} - ₹${c.price}`).join("\n")}\nTotal: ₹${total}`
  );

  return (
    <div>
      <Typography variant="h5" gutterBottom>💳 Checkout</Typography>
      <Typography variant="body1">Total: ₹{total}</Typography>

      <a
        href={`https://wa.me/919873398504?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="contained" color="success" sx={{ mt: 2 }}>
          Order on WhatsApp
        </Button>
      </a>

      <Typography sx={{ mt: 3 }}>Or call us: 📞 9999999999</Typography>
      <Typography sx={{ mt: 1 }}>Scan & Pay:</Typography>
      <img src="/qr.png" alt="QR Code" width="200" />
    </div>
  );
}
