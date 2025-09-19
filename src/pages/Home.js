import React, { useState, useEffect } from "react";
import { menu } from "../data/menu";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, Tabs, Tab } from "@mui/material";

export default function Home({ addToCart }) {
  const [cartCounts, setCartCounts] = useState(() => {
    // Load initial state from localStorage
    const savedCounts = localStorage.getItem("cartCounts");
    return savedCounts ? JSON.parse(savedCounts) : {};
  });
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // Save cartCounts to localStorage whenever it changes
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
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card sx={{ margin: "auto" }}>
            <CardMedia component="img" height="140" image={item.img} alt={item.name} />
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography color="text.secondary">₹{item.price}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveFromCart(item)}
                  disabled={!cartCounts[item.id]}
                  sx={{ minWidth: "40px" }}
                >
                  -
                </Button>
                <Typography sx={{ mx: 2 }}>{cartCounts[item.id] || 0}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleAddToCart(item)}
                  sx={{ minWidth: "40px" }}
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
    <div style={{ padding: "16px" }}>
      {/* Tabs for Categories */}
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Main Course" />
        <Tab label="Sweets" />
      </Tabs>

      {/* Render Items Based on Selected Tab */}
      <Box sx={{ mt: 3 }}>
        {selectedTab === 0 && renderItems(menu.mainCourse)}
        {selectedTab === 1 && renderItems(menu.sweets)}
      </Box>
    </div>
  );
}