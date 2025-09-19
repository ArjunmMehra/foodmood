import React from "react";
import { List, ListItem, ListItemText, Typography, Button } from "@mui/material";

export default function Cart({ cart, goToCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryCharge = subtotal < 250 ? 10 : 0; // Add ₹10 delivery charge if subtotal is less than ₹250
  const total = subtotal + deliveryCharge;

  return (
    <div>
      <Typography variant="h5" gutterBottom>🛒 Cart</Typography>
      <List>
        {cart.map((item, idx) => (
          <ListItem key={idx} divider>
            <ListItemText primary={item.name} secondary={`₹${item.price}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 2 }}>Subtotal: ₹{subtotal}</Typography>
      {deliveryCharge > 0 && (
        <Typography variant="body1" color="text.secondary">
          Delivery Charge: ₹{deliveryCharge}
        </Typography>
      )}
      <Typography variant="h6" sx={{ mt: 1 }}>Total: ₹{total}</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={goToCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
}