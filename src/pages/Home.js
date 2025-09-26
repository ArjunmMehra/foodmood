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
  Paper,
  Stack,
} from "@mui/material";
import { menu } from "../data/menu";

export default function Home({ search }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});

  const getQuantity = (id, variantLabel) => {
    const cartItem = items.find(
      (i) => i.id === id && i.variant === variantLabel
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleVariantChange = (itemId, variant) => {
    setSelectedVariants((prev) => ({ ...prev, [itemId]: variant }));
  };

  const renderItems = (items) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0) {
      return (
        <Typography sx={{ mt: 3, textAlign: "center" }}>
          ❌ No items found
        </Typography>
      );
    }

    return (
      <Grid container spacing={3} justifyContent="center">
        {filtered.map((item) => {
          const selectedVariant = selectedVariants[item.id] || item.variants[0];
          const quantity = getQuantity(item.id, selectedVariant.label);

          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  width: 320,
                  height: 380,
                  margin: "auto",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.img}
                  alt={item.name}
                  sx={{ height: 180, objectFit: "cover", borderRadius: "8px 8px 0 0" }}
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

                    {/* Dynamic Variant Selector */}
                    {item.variants.length > 1 ? (
                      <Select
                        size="small"
                        value={selectedVariant.label}
                        onChange={(e) =>
                          handleVariantChange(
                            item.id,
                            item.variants.find(
                              (v) => v.label === e.target.value
                            )
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
                    ) : (
                      <Typography sx={{ mb: 1 }}>₹{item.variants[0].price}</Typography>
                    )}
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
  };

  return (
    <Box sx={{ padding: "24px", minHeight: "100vh" }}>
      {/* Hero Messages */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Paper
          elevation={4}
          sx={{
            padding: "16px",
            textAlign: "center",
            bgcolor: "linear-gradient(90deg, #ffb347, #ffcc33)",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary">
            Fill your plate, not the fee 🚚✨ Free delivery on ₹350+ orders!
          </Typography>
        </Paper>

        <Paper
          elevation={4}
          sx={{
            padding: "16px",
            textAlign: "center",
            bgcolor: "linear-gradient(90deg, #2196f3, #64b5f6)",
            color: "#fff",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Festive Rush? No Tension! Pre-Book Your Sweets Now. 😍
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'chocolate' }}>
            Shaadi ho, party ho ya corporate get-together 🪔 We’ve got the
            perfect catering for every event.
          </Typography>
        </Paper>
      </Stack>

      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={(e, v) => setSelectedTab(v)}
        centered
      >
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
