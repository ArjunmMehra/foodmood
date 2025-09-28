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
import Slider from "react-slick";
import { menu } from "../data/menu";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home({ search }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});

  // get item qty
  const getQuantity = (id, variantLabel) => {
    const cartItem = items.find(
      (i) => i.id === id && i.variant === variantLabel
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleVariantChange = (itemId, variant) => {
    setSelectedVariants((prev) => ({ ...prev, [itemId]: variant }));
  };

  // render items
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
      <Grid container spacing={2} justifyContent="center">
        {filtered.map((item) => {
          const selectedVariant = selectedVariants[item.id] || item.variants[0];
          const quantity = getQuantity(item.id, selectedVariant.label);

          return (
            <Grid item xs={6} sm={4} md={3} key={item.id}>
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 180,
                  minWidth:150,
                  height: 250,
                  margin: 0,
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.img}
                  alt={item.name}
                  sx={{ height: 100, objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "120px",
                    p: 1,
                    pb: "4px",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ mb: 1, textAlign: "center" }}
                  >
                    {item.name}
                  </Typography>

                  {/* Variant + Controls wrapper with BG color */}
                  <Box
                    sx={{
                      bgcolor: "#f9f9f9",
                      borderRadius: 1,
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
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
                      sx={{
                        mb: 1,
                        fontSize: "0.75rem",
                        ".MuiSelect-select": { p: 0.5 },
                        minWidth: 70,
                        bgcolor: "white",
                        borderRadius: 0.5,
                      }}
                    >
                      {item.variants.map((variant) => (
                        <MenuItem
                          key={variant.label}
                          value={variant.label}
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {variant.label} - ₹{variant.price}
                        </MenuItem>
                      ))}
                    </Select>

                    {/* + - buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          minWidth: "28px",
                          width: "28px",
                          height: "28px",
                          fontSize: "0.8rem",
                          p: 0,
                        }}
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
                      <Typography
                        sx={{
                          mx: 1,
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                        }}
                      >
                        {quantity}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          minWidth: "28px",
                          width: "28px",
                          height: "28px",
                          fontSize: "0.8rem",
                          p: 0,
                        }}
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
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  // carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box
      sx={{
        padding: 0,
        minHeight: "100vh",
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Carousel Banner */}
       {/* Carousel Banner */}
       <Slider {...sliderSettings} style={{ margin: 0 }}>
        {["banner5.jpeg", "banner2.jpeg", "banner3.jpeg", "banner1.jpeg", "banner2.jpeg", ].map((img, idx) => (
          <Box key={idx} sx={{ width: "100%", px: 0 }}>
            <img
              src={`/images/${img}`}
              alt={`Banner ${idx + 1}`}
              style={{
                width: "100%",
                borderRadius: 0,
                maxHeight: "180px",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Slider>

      {/* 🔥 Scrollable Horizontal Menu with All Items */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          p: 0,
          pt:0,
          gap: 2,
          m:0,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {Object.values(menu)
          .flat()
          .map((item) => (
            <Card
              key={item.id}
              sx={{
                minWidth: 100,
                maxWidth: 120,
                flexShrink: 0,
                borderRadius: 0,
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={item.name}
                sx={{
                  height: 60,
                  objectFit: "cover",
                }}
              />
              {/* <CardContent sx={{ p: 1, backgroundColor: "aliceblue" }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="normal"
                  textAlign="center"
                  noWrap
                >
                  {item.name}
                </Typography>
              </CardContent> */}
            </Card>
          ))}
      </Box>


      {/* <Stack spacing={1} sx={{ mt: 2, mb: 2 }}>
        <Paper elevation={1} sx={{ padding: "10px", textAlign: "center" }}>
          <Typography variant="body2">
            Serving love in every meal and mithai 🍴🍬
          </Typography>
        </Paper>
        <Paper
          elevation={1}
          sx={{
            padding: "8px",
            textAlign: "center",
            bgcolor: "#e3f2fd",
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" color="primary">
            Festive Rush? No Tension! Pre-Book Your Sweets Now. 😍
          </Typography>
        </Paper>
      </Stack> */}

      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={(e, v) => setSelectedTab(v)}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="🍬 Sweets" />
        <Tab label="🍛 Main Course" />
      </Tabs>

      <Box sx={{ mt: 0 }}>
        {selectedTab === 0 && renderItems(menu.sweets)}
        {selectedTab === 1 && renderItems(menu.mainCourse)}
      </Box>
    </Box>
  );
}
