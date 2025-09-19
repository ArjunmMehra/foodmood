import React from "react";
import { List, ListItem, ListItemText, Typography, Button } from "@mui/material";

export default function Cart({ cart, goToCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
      <Typography variant="h6" sx={{ mt: 2 }}>Total: ₹{total}</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={goToCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
}
