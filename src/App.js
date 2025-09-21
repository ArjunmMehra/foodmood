import React, { useState } from "react";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  CssBaseline
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("home");

  const addToCart = (item) => setCart([...cart, item]);

  // Create a green and yellow theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4caf50", // Green color
      },
      secondary: {
        main: "#ffeb3b", // Yellow color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          {/* Logo as Home Icon */}
          <Box
            component="img"
            src={"images/logo.png"} // Ensure you have a logo image at this path
            alt="Logo"
            sx={{
              height: 60,
              width: 60,
              cursor: "pointer",
              marginRight: 2,
              // flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={() => setStep("home")} // Navigate to home on click
          />
          {/* <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => setStep("home")}
          >
            🍴 Food & Sweets
          </Typography> */}
          <Button
            color="inherit"
            sx={{ marginLeft: "auto" }}
            onClick={() => setStep("cart")}
          >
            Cart ({cart.length})
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        {step === "home" && (
          <Home addToCart={addToCart} goToCart={() => setStep("cart")} />
        )}
        {step === "cart" && (
          <Cart cart={cart} goToCheckout={() => setStep("checkout")} />
        )}
        {step === "checkout" && <Checkout cart={cart} />}
      </Container>
      </ThemeProvider>
  );
}

export default App;
