import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/bg.png";

export default function Home() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "white",
          marginBottom: 2,
          fontWeight: "bold",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        SafeRoads: AI-Enabled Accident Detection
      </Typography>
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "30%",
        }}
      >
        <Button
          variant="contained"
          component={Link}
          to="/live-cctv"
          sx={{
            margin: 1,
            fontWeight: "bold",
            padding: "15px",
            backgroundColor: "#37B5B6",
            color: "black",
            width: "100%",
            transition:
              "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "#10b0a6",
            },
          }}
        >
          Live CCTV
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/detected-accidents"
          sx={{
            margin: 1,
            padding: "15px",
            fontWeight: "bold",
            backgroundColor: "#F2F597",
            color: "black",
            width: "100%",
            transition:
              "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "#f2ee66",
            },
          }}
        >
          Detected Accidents
        </Button>
      </div>
    </Container>
  );
}
