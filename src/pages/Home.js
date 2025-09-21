import React, { useState, useEffect } from "react";
import { menu } from "../data/menu";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, Tabs, Tab } from "@mui/material";

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
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card sx={{ width: "300px", height: "400px", margin: "auto", display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              image={item.img}
              alt={item.name}
              sx={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
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
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Sweets" />
        <Tab label="Main Course" />
      </Tabs>
      <Box sx={{ mt: 3 }}>
        {selectedTab === 0 && renderItems(menu.sweets)}
        {selectedTab === 1 && renderItems(menu.mainCourse)}
      </Box>
    </div>
  );
}