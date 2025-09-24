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
import { useSelector } from "react-redux";
import { selectCart } from "./store/cartSlice";

function App() {
  const [step, setStep] = useState("home");
  const cart = useSelector(selectCart);

  // Theme config
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2e7d32",
        light: "#60ad5e",
        dark: "#005005",
        contrastText: "#fff",
      },
      secondary: {
        main: "#fbc02d",
        light: "#fff263",
        dark: "#c49000",
        contrastText: "#000",
      },
      background: {
        default: "#fdfdf6",
        paper: "#ffffff",
      },
      error: {
        main: "#d32f2f",
      },
    },
    typography: {
      fontFamily: "'Poppins', 'Roboto', sans-serif",
      h4: {
        fontWeight: 700,
        color: "#2e7d32",
      },
      h6: {
        fontWeight: 600,
        color: "#fbc02d",
      },
      button: {
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "25px",
      },
    },
    shape: {
      borderRadius: 16,
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
                mb: 0.1,
              }}
            />
          </Box>

          {/* Cart Button */}
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
        {step === "home" && <Home goToCart={() => setStep("cart")} />}
        {step === "cart" && <Cart goToCheckout={() => setStep("checkout")} />}
        {step === "checkout" && <Checkout />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
