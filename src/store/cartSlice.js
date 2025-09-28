// src/store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, variant } = action.payload;
      const existing = state.items.find(
        (i) => i.id === id && i.variant === variant
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id, variant } = action.payload;
      const existing = state.items.find(
        (i) => i.id === id && i.variant === variant
      );
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (i) => !(i.id === id && i.variant === variant)
          );
        }
      }
    },
    updateQuantity: (state, action) => {
      const { id, variant, quantity } = action.payload;
      const existing = state.items.find(
        (i) => i.id === id && i.variant === variant
      );
      if (existing) {
        existing.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// ✅ Export selectors
export const selectCart = (state) => state.cart.items;

export const selectSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectDeliveryCharge = (state) =>
  selectSubtotal(state) < 250 ? 10 : 0;

export const selectTotal = (state) =>
  selectSubtotal(state) + selectDeliveryCharge(state);

// Export reducer
export default cartSlice.reducer;
