import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

export default function DetectAccident() {
  const [detectedAccidents, setDetectedAccidents] = useState([]);

  const handleDetectAccident = async () => {
    try {
      const response = await fetch("http://localhost:5000/process_video", {
        method: "POST",
      });
      if (response.ok) {
        const result = await response.json();
        if (result.processed_video_filename) {
          const { location, timestamp } = extractLocationAndTime(
            result.processed_video_filename
          );
          const newDetectedAccident = {
            id: Date.now(),
            details: {
              location,
              timestamp,
            },
            videoFileName: result.processed_video_filename,
          };
          setDetectedAccidents((prevAccidents) => [
            newDetectedAccident,
            ...prevAccidents,
          ]);
        } else {
          console.error("Error processing video");
        }
      } else {
        console.error("Error processing video");
      }
    } catch (error) {
      console.error("Error processing video", error);
    }
  };

  const extractLocationAndTime = (filename) => {
    const parts = filename.split("-");
    if (parts.length >= 2) {
      const location = parts[0];
      const timestamp = parts[1].split(".")[0];
      return { location, timestamp };
    }
    return { location: "", timestamp: "" };
  };

  const formatTime = (timestamp) => {
    const [hours, minutes, seconds] = timestamp.split("_");
    const formattedHours = parseInt(hours) % 12 || 12;
    return `${formattedHours}:${minutes}:${seconds} ${
      parseInt(hours) >= 12 ? "PM" : "AM"
    }`;
  };

  return (
    <Container disableGutters>
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
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDetectAccident}
            sx={{ marginTop: "30px" }}
          >
            Detect Accident
          </Button>
        </Grid>
        {detectedAccidents.map((detectedAccident) => (
          <Grid item xs={12} key={detectedAccident.id}>
            <Card>
              <CardHeader title="Accident Detected!" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <video
                  width="300"
                  style={{ marginLeft: "10px", paddingBottom: "8px" }}
                  autoPlay
                  muted
                  loop
                >
                  <source
                    src={`http://localhost:5000/processed_videos/${detectedAccident.videoFileName}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <CardContent>
                  <Typography variant="h6">Accident Details</Typography>
                  <Typography>
                    <strong>Location:</strong>{" "}
                    {detectedAccident.details.location}
                  </Typography>
                  <Typography>
                    <strong>Timestamp:</strong>{" "}
                    {formatTime(detectedAccident.details.timestamp)}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
