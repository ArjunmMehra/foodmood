import React, { useState } from "react";
import { menu } from "../data/menu";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

export default function Home({ addToCart, goToCart }) {
  const [cartCounts, setCartCounts] = useState({});

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

  return (
    <div style={{ padding: "16px" }}>
      {/* Go to Cart Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={goToCart}>
          Go to Cart
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>Main Course</Typography>
      <Grid container spacing={2}>
        {menu.mainCourse.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia component="img" height="140" image={item.img} alt={item.name} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">₹{item.price}</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 1, width: "100%" }}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart {cartCounts[item.id] ? `(${cartCounts[item.id]})` : ""}
                </Button>
                {cartCounts[item.id] > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 1, width: "100%" }}
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    Remove from Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Sweets</Typography>
      <Grid container spacing={2}>
        {menu.sweets.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia component="img" height="140" image={item.img} alt={item.name} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">₹{item.price}</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 1, width: "100%" }}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart {cartCounts[item.id] ? `(${cartCounts[item.id]})` : ""}
                </Button>
                {cartCounts[item.id] > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 1, width: "100%" }}
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    Remove from Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}