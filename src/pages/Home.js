import React from "react";
import { menu } from "../data/menu";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

export default function Home({ addToCart, goToCart }) {
  return (
    <div>
      <Typography variant="h5" gutterBottom>Main Course</Typography>
      <Grid container spacing={2}>
        {menu.mainCourse.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card>
              <CardMedia component="img" height="140" image={item.img} alt={item.name} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">₹{item.price}</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Sweets</Typography>
      <Grid container spacing={2}>
        {menu.sweets.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card>
              <CardMedia component="img" height="140" image={item.img} alt={item.name} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">₹{item.price}</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="outlined" sx={{ mt: 3 }} onClick={goToCart}>
        Go to Cart
      </Button>
    </div>
  );
}
