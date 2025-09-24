// src/components/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/cartSlice";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

export default function Cart({ goToCheckout }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = subtotal < 250 && subtotal > 0 ? 10 : 0;
  const total = subtotal + deliveryCharge;

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h5" gutterBottom>
        🛒 Your Cart
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {items.map((item) => (
            <Card
              key={`${item.id}-${item.variant}`}
              sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: 2,
                background: "#fffef9",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h6">{item.name}</Typography>
                  {item.variant && (
                    <Typography variant="body2" color="text.secondary">
                      {item.variant}
                    </Typography>
                  )}
                  <Typography variant="body1" fontWeight="bold">
                    ₹{item.price}
                  </Typography>
                </Box>

                {/* Quantity controls */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color="secondary"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          variant: item.variant,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <Typography sx={{ mx: 2, fontWeight: "bold" }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          variant: item.variant,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          id: item.id,
                          variant: item.variant,
                        })
                      )
                    }
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* Price Summary */}
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Typography variant="body1">Subtotal: ₹{subtotal}</Typography>
            {deliveryCharge > 0 && (
              <Typography variant="body1">
                Delivery: ₹{deliveryCharge}
              </Typography>
            )}
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total: ₹{total}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={goToCheckout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
