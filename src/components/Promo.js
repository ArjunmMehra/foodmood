import React from "react";
import { Box, Typography } from "@mui/material";

export default function Promo() {
  const promos = [
    "Fill your plate, not the fee 🚚✨ Free delivery on ₹350+ orders!",
    "Festive Rush? No Tension! Pre-Book Your Sweets Now. 😍",
    "Shaadi ho, party ho ya corporate get-together 🪔 We’ve got the perfect catering for every event.",
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        background: "linear-gradient(90deg, #4caf50, #ffeb3b)",
        color: "#000",
        py: 1,
        fontWeight: "bold",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Box
        component="div"
        sx={{
          display: "inline-block",
          px: 2,
          animation: "marquee 15s linear infinite",
          "@keyframes marquee": {
            "0%": { transform: "translateX(100%)" },
            "100%": { transform: "translateX(-100%)" },
          },
        }}
      >
        {promos.map((text, index) => (
          <Typography
            key={index}
            component="span"
            sx={{ mx: 4, fontSize: "0.9rem" }}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
