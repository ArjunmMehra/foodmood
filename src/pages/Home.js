import React, { useState, useEffect } from "react";
import { menu } from "../data/menu";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Paper,
  Chip,
} from "@mui/material";

export default function Home({ addToCart }) {
  const [cartCounts, setCartCounts] = useState(() => {
    const savedCounts = localStorage.getItem("cartCounts");
    return savedCounts ? JSON.parse(savedCounts) : {};
  });
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartCounts", JSON.stringify(cartCounts));
  }, [cartCounts]);

  const handleAddToCart = (item) => {
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [item.id]: (prevCounts[item.id] || 0) + 1,
    }));
    addToCart(item);
  };

  const handleRemoveFromCart = (item) => {
    setCartCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[item.id] > 0) {
        newCounts[item.id] -= 1;
      }
      return newCounts;
    });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderItems = (items) => (
    <Grid container spacing={3} justifyContent="center">
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card
            sx={{
              width: 320,
              height: 420, // ✅ fixed card height
              margin: "auto",
              border: "1px solid #fbc02d",
              boxShadow: "0 6px 12px rgba(46, 125, 50, 0.2)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
              },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="img"
              image={item.img}
              alt={item.name}
              sx={{
                height: 180, // ✅ fixed image height
                objectFit: "cover",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {item.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  ₹{item.price}
                </Typography>
                <Chip
                  label="Bestseller"
                  color="secondary"
                  size="small"
                  sx={{ mb: 2 }}
                />
              </Box>
  
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: "auto",
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveFromCart(item)}
                  disabled={!cartCounts[item.id]}
                  sx={{
                    minWidth: "60px",
                    fontWeight: "bold",
                    borderRadius: "10%",
                  }}
                >
                  -
                </Button>
                <Typography sx={{ mx: 2, fontWeight: "bold" }}>
                  {cartCounts[item.id] || 0}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(item)}
                  sx={{
                    minWidth: "60px",
                    fontWeight: "bold",
                    borderRadius: "10%",
                  }}
                >
                  +
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
  

  return (
    <Box
      sx={{
        padding: "24px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff7f0, #fff0f5)",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "16px",
          marginBottom: "24px",
          borderRadius: "16px",
          textAlign: "center",
          background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
          color: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Serving love in every meal and mithai 🍴🍬
        </Typography>
      </Paper>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        sx={{
          mb: 4,
          "& .MuiTab-root": { fontWeight: "bold" },
          "& .Mui-selected": { color: "#d81b60 !important" },
          "& .MuiTabs-indicator": { backgroundColor: "#d81b60" },
        }}
      >
        <Tab label="🍬 Sweets" />
        <Tab label="🍛 Main Course" />
      </Tabs>

      <Box>{selectedTab === 0 && renderItems(menu.sweets)}</Box>
      <Box>{selectedTab === 1 && renderItems(menu.mainCourse)}</Box>
    </Box>
  );
}
