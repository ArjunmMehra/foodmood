import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Paper
} from "@mui/material";
import { menu } from "../data/menu";

export default function Home({ goToCart }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});

  // find quantity of an item in cart
  const getQuantity = (id, variantLabel) => {
    const cartItem = items.find(
      (i) => i.id === id && i.variant === variantLabel
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleVariantChange = (itemId, variant) => {
    setSelectedVariants((prev) => ({ ...prev, [itemId]: variant }));
  };

  const renderItems = (items) => (
    <Grid container spacing={3} justifyContent="center">
      {items.map((item) => {
        const selectedVariant = selectedVariants[item.id] || item.variants[0];
        const quantity = getQuantity(item.id, selectedVariant.label);

        return (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ width: 320, height: 380, margin: "auto" }}>
              <CardMedia
                component="img"
                image={item.img}
                alt={item.name}
                sx={{ height: 180, objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "200px",
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.name}
                  </Typography>

                  {/* Variant Selector */}
                  <Select
                    size="small"
                    value={selectedVariant.label}
                    onChange={(e) =>
                      handleVariantChange(
                        item.id,
                        item.variants.find((v) => v.label === e.target.value)
                      )
                    }
                    sx={{ mb: 1, minWidth: 120 }}
                  >
                    {item.variants.map((variant) => (
                      <MenuItem key={variant.label} value={variant.label}>
                        {variant.label} - ₹{variant.price}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                {/* + - controls */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          id: item.id,
                          variant: selectedVariant.label,
                        })
                      )
                    }
                    disabled={quantity === 0}
                  >
                    -
                  </Button>
                  <Typography sx={{ mx: 2, fontWeight: "bold" }}>
                    {quantity}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          ...item,
                          price: selectedVariant.price,
                          variant: selectedVariant.label,
                        })
                      )
                    }
                  >
                    +
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <Box sx={{ padding: "24px", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{ padding: "16px", marginBottom: "24px", textAlign: "center" }}
      >
        <Typography variant="body2">
          Serving love in every meal and mithai🍴🍬
        </Typography>
      </Paper>
      <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)} centered>
        <Tab label="🍬 Sweets" />
        <Tab label="🍛 Main Course" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {selectedTab === 0 && renderItems(menu.sweets)}
        {selectedTab === 1 && renderItems(menu.mainCourse)}
      </Box>
    </Box>
  );
}
