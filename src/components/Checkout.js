import React, { useState } from "react";
import { Typography, Button, TextField, Box, Stack, Link } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Checkout({ cart }) {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryCharge = subtotal < 250 ? 10 : 0; 
  const total = subtotal + deliveryCharge;

  const message = encodeURIComponent(
    `Hi, I want to order:\n${cart
      .map((c) => `${c.name} - ₹${c.price}`)
      .join("\n")}\n\nTotal: ₹${total}\n\nAddress: ${address}\nMobile: ${mobile}`
  );

  const handleOrder = () => {
    if (!address || !mobile) {
      alert("Please fill in your address and mobile number.");
      return;
    }
    window.open(`https://wa.me/919773832474?text=${message}`, "_blank");
  };

  const phoneNumbers = ["9910913565", "9873398504", "9773832474", "9318333632"];

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        💳 Checkout
      </Typography>
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

      {/* WhatsApp Order Button */}
      <Button
        variant="contained"
        color="success"
        startIcon={<WhatsAppIcon />}
        sx={{ mt: 2 }}
        onClick={handleOrder}
      >
        Order on WhatsApp
      </Button>

      {/* Call Us */}
      <Typography sx={{ mt: 3, mb: 1 }}>Or call us:</Typography>
      <Stack spacing={1}>
        {phoneNumbers.map((num) => (
          <Link href={`tel:${num}`} key={num} underline="hover" color="primary">
            📞 {num}
          </Link>
        ))}
      </Stack>

      {/* QR Code */}
      <Typography sx={{ mt: 3 }}>Scan & Pay:</Typography>
      <img src="/qr.png" alt="QR Code" width="200" />
    </div>
  );
}
