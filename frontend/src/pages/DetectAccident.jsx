import React, { useState, useEffect } from "react";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RadarIcon from "@mui/icons-material/Radar";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

export default function DetectAccident() {
  const [detectedAccidents, setDetectedAccidents] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedAccidents = JSON.parse(
      localStorage.getItem("detectedAccidents")
    );
    if (storedAccidents) {
      setDetectedAccidents(storedAccidents);
    }
  }, []);

  const handleDetectAccident = async () => {
    try {
      setIsProcessing(true);

      const response = await fetch("http://localhost:5000/process_videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const results = await response.json();
        const newAccidents = results
          .map((result) => {
            if (result.processed_video_filename) {
              const { location, timestamp } = extractLocationAndTime(
                result.processed_video_filename
              );
              return {
                id: Date.now(),
                details: {
                  location,
                  timestamp,
                },
                videoFileName: result.processed_video_filename,
              };
            } else {
              console.error("Error processing video");
              return null;
            }
          })
          .filter(Boolean);

        setDetectedAccidents((prevAccidents) => [
          ...newAccidents,
          ...prevAccidents,
        ]);
        localStorage.setItem(
          "detectedAccidents",
          JSON.stringify([...newAccidents, ...detectedAccidents])
        );
      } else {
        console.error("Error processing videos");
      }
    } catch (error) {
      console.error("Error processing videos", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveAllAccidents = () => {
    setDetectedAccidents([]);
    localStorage.removeItem("detectedAccidents");
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
    <Container disableGutters style={{ marginBottom: "30px" }}>
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
            color="success"
            onClick={handleDetectAccident}
            startIcon={<RadarIcon />}
            sx={{ marginTop: "30px", marginRight: "10px" }}
            disabled={isProcessing}
          >
            Detect Accidents
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleRemoveAllAccidents}
            sx={{ marginTop: "30px" }}
            startIcon={<DeleteForeverIcon />}
            disabled={detectedAccidents.length === 0}
          >
            Remove All Accidents
          </Button>
        </Grid>
        {isProcessing && (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <CircularProgress size={40} sx={{ marginTop: 2 }} />
          </Grid>
        )}
        {detectedAccidents.map((detectedAccident) => (
          <Grid item xs={12} key={detectedAccident.details.location}>
            <Card sx={{ height: "300px" }}>
              <CardHeader title="Accident Detected!" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <video
                  width="300px"
                  style={{ marginLeft: "10px" }}
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
