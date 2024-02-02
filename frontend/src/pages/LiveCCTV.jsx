import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

export default function LiveCCTV() {
  const videos = [
    {
      path: "/demo-videos/location1.mp4",
    },
    {
      path: "/demo-videos/location2.mp4",
    },
    {
      path: "/demo-videos/location3.mp4",
    },
    {
      path: "/demo-videos/location4.mp4",
    },
    {
      path: "/demo-videos/location1.mp4",
    },
    {
      path: "/demo-videos/location2.mp4",
    },
  ];

  const extractLocationFromFileName = (filePath) => {
    const fileName = filePath.split("/").pop();
    const location = fileName.split(".")[0];
    return location;
  };

  return (
    <Container
    maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        paddingLeft: 2,
        paddingRight: 2,
        backgroundColor: "#f0f0f0", 
      }}
    >
      <Tooltip title="Back to Home">
        <Link
          to="/"
          style={{ position: "absolute", top: 0, left: 0, margin: "16px" }}
        >
          <IconButton color="primary" aria-label="back to home">
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <Typography
        variant="h4"
        sx={{
          color: "black",
          marginBottom: 2,
          marginTop: 2,
          fontWeight: "bold", 
          fontFamily: "Arial, sans-serif", 
        }}
      >
        LIVE CCTV
      </Typography>
      <Grid container columnSpacing="400px" justifyContent="center">
        {videos.map((video, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} lg={6} xl={6}>
            <Card sx={{ marginY: 4, display: 'flex', flexDirection: 'column' }}>
              <video
                autoPlay
                height= "300px"
                muted
                loop
                width="100%"
                src={video.path}
                type="video/mp4"
              >
                Your browser does not support the video tag.
              </video>
              <CardContent>
                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                  Location: {extractLocationFromFileName(video.path)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
