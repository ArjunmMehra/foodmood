// src/components/Checkout.js
import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  Stack,
  Link,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useSelector } from "react-redux";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = subtotal < 250 && subtotal > 0 ? 10 : 0;
  const total = subtotal + deliveryCharge;

  const phoneNumbers = ["9910913565", "9873398504", "9773832474", "9315900193"];

  const handleOrder = () => {
    if (!address || !mobile) {
      alert("Please fill in your address and mobile number.");
      return;
    }

    const message = encodeURIComponent(
      `Hi, I want to order:\n${items
        .map((c) => `${c.name} x ${c.quantity} = ₹${c.price * c.quantity}`)
        .join("\n")}\n\nSubtotal: ₹${subtotal}${
        deliveryCharge ? `\nDelivery Charge: ₹${deliveryCharge}` : ""
      }\nTotal: ₹${total}\n\nAddress: ${address}\nMobile: ${mobile}`
    );

    window.open(`https://wa.me/919315900193?text=${message}`, "_blank");
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        💳 Checkout
      </Typography>

      {/* Cart Items */}
      {items.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Box>
          {items.map((item) => (
            <Card key={`${item.id}-${item.variant}`} sx={{ mb: 1, background: "#fffef9" }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="body1">{item.name}</Typography>
                  {item.variant && (
                    <Typography variant="body2" color="text.secondary">
                      {item.variant}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body1">
                  ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                </Typography>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* Price Summary */}
          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Typography variant="body1">Subtotal: ₹{subtotal}</Typography>
            {deliveryCharge > 0 && (
              <Typography variant="body1">Delivery: ₹{deliveryCharge}</Typography>
            )}
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total: ₹{total}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Address & Mobile Input */}
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

      {/* WhatsApp Order Button */}
      <Button
        variant="contained"
        color="success"
        startIcon={<WhatsAppIcon />}
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleOrder}
        disabled={items.length === 0}
      >
        Order on WhatsApp
      </Button>

      {/* Contact Numbers */}
      <Typography sx={{ mt: 4, mb: 1 }}>📞 Or call us:</Typography>
      <Stack spacing={1}>
        {phoneNumbers.map((num) => (
          <Link href={`tel:${num}`} key={num} underline="hover" color="primary">
            {num}
          </Link>
        ))}
      </Stack>

      {/* QR Code */}
      <Typography sx={{ mt: 4 }}>📷 Scan & Pay:</Typography>
      <Box sx={{ mt: 1 }}>
        <img src="/images/qr.jpeg" alt="QR Code" width="200" />
      </Box>
    </Box>
  );
}
