import React, { useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";

export default function Checkout({ cart }) {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryCharge = subtotal < 250 ? 10 : 0; // Add ₹10 delivery charge if subtotal is less than ₹250
  const total = subtotal + deliveryCharge;

  const message = encodeURIComponent(
    `Hi, I want to order:\n${cart.map((c) => `${c.name} - ₹${c.price}`).join("\n")}\n\nTotal: ₹${total}\n\nAddress: ${address}\nMobile: ${mobile}`
  );

  const handleOrder = () => {
    if (!address || !mobile) {
      alert("Please fill in your address and mobile number.");
      return;
    }
    window.open(`https://wa.me/919873398504?text=${message}`, "_blank");
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>💳 Checkout</Typography>
      <Typography variant="body1">Total: ₹{total}</Typography>

      {/* Address Input */}
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Address"
          multiline
          rows={3}
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Mobile Number"
          fullWidth
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          variant="outlined"
        />
      </Box>

      {/* Order Button */}
      <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={handleOrder}
      >
        Order on WhatsApp
      </Button>

      <Typography sx={{ mt: 3 }}>Or call us: 📞 9873398504</Typography>
      <Typography sx={{ mt: 1 }}>Scan & Pay:</Typography>
      <img src="/qr.png" alt="QR Code" width="200" />
    </div>
  );
}