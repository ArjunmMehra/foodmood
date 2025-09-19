import React, { useState } from "react";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

function App() {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("home");

  const addToCart = (item) => setCart([...cart, item]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => setStep("home")}
          >
            🍴 Food & Sweets
          </Typography>
          <Button color="inherit" onClick={() => setStep("cart")}>
            Cart ({cart.length})
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        {step === "home" && <Home addToCart={addToCart} goToCart={() => setStep("cart")} />}
        {step === "cart" && <Cart cart={cart} goToCheckout={() => setStep("checkout")} />}
        {step === "checkout" && <Checkout cart={cart} />}
      </Container>
    </div>
  );
}

export default App;
