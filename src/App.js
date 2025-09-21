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
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("home");

  const addToCart = (item) => setCart([...cart, item]);
  // Create a green and yellow theme with tasty vibes
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2e7d32", // Fresh organic green
        light: "#60ad5e", // Soft green
        dark: "#005005", // Deep forest
        contrastText: "#fff",
      },
      secondary: {
        main: "#fbc02d", // Lemon yellow
        light: "#fff263", // Bright yellow
        dark: "#c49000", // Honey gold
        contrastText: "#000",
      },
      background: {
        default: "#fdfdf6", // light off-white with a warm tone
        paper: "#ffffff",
      },
      error: {
        main: "#d32f2f", // red for alerts
      },
    },
    typography: {
      fontFamily: "'Poppins', 'Roboto', sans-serif",
      h4: {
        fontWeight: 700,
        color: "#2e7d32", // rich green for headings
      },
      h6: {
        fontWeight: 600,
        color: "#fbc02d", // golden accent for sub-headings
      },
      button: {
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "25px",
      },
    },
    shape: {
      borderRadius: 16, // rounded corners everywhere
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #2e7d32, #fbc02d)",
        }}
      >
        <Toolbar sx={{ pl: 0 }}>
          {/* Logo as Home Icon */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              mr: 2,
            }}
            onClick={() => setStep("home")}
          >
            <Box
              component="img"
              src={"images/logo.png"}
              alt="Logo"
              sx={{
                height: 60,
                width: 60,
                mb: 0.1, // small spacing below logo
              }}
            />
            {/* <Typography
              variant="caption"
              sx={{
                color: "white",
                fontWeight: "600",
                lineHeight: 1.2,
                textAlign: "center",
              }}
            >
              Food & Sweets
              Gr Noida West
            </Typography> */}
          </Box>

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
