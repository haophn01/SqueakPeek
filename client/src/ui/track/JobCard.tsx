"use client";
import React, { SetStateAction } from "react";
import { Card, Typography, IconButton, Box } from "@mui/material";
import {
  faChartColumn,
  faLink,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { faMessage} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateStatus from "@/ui/track/UpdateStatus";
import { ApplicationStage, useTrack } from "@/lib/store/track";

// TODO:
// Implement the Link for message, chart, stats
// Implement the Company Brand Logo based on the company name

interface JobCardProps {
  applicationId: string;
  Company: string;
  Role: string;
  Status: ApplicationStage;
}

export function JobCard({
  applicationId,
  Company,
  Role,
  Status,
}: JobCardProps) {
  const { moveApplication } = useTrack();

  // Handle status change and update the card's state
  const handleStatusChange = (newStatus: SetStateAction<ApplicationStage>) => {
    const resolvedStatus =
      typeof newStatus === "function" ? newStatus(Status) : newStatus;
    if (resolvedStatus !== Status) {
      moveApplication(Status, resolvedStatus, applicationId);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: "8px",
        border: "2px solid #E0E4F2",
        backgroundColor: "#F6F8FF",
        display: "grid",
        gridTemplateColumns: "50px auto 30px", // Fixed width for each column
        alignItems: "center",
        padding: "10px", // Consistent padding around the card
        marginX: "auto",
        boxShadow: "none",
        marginBottom: "10px", // Space between cards
        overflow: "hidden", // Ensures content doesn’t overflow
      }}
    >
      {/* Column 1: Company Brand */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
        }}
      >
        <Image
          src="/landingpage/logo.svg"
          height={40}
          width={40}
          alt="Squeakpeek Logo"
          style={{
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Box>

      {/* Column 2: Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "4px",
          ml: 1,
        }}
      >
        {/* Row 1: Company Name and Status */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            width: "100%",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
            {Company}
          </Typography>
          <UpdateStatus
            required
            name="status"
            options={[
              "Applied",
              "Rejected",
              "Online Assesstment",
              "Interviewing",
              "Offer",
            ]}
            applicationStatus={Status}
            setApplicationStage={handleStatusChange}
            customSx={{
              height: "20px",
              fontSize: "10px",
              width: "70px", // Adjust width for fit
            }}
          />
        </Box>

        {/* Row 2: Role Title */}
        <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
          {Role}
        </Typography>

        {/* Row 3: Icon Buttons */}
        <Box sx={{ display: "flex", gap: "6px" }}>
          <IconButton
            sx={{
              padding: "6px", // Adjusted padding for larger button size
              borderRadius: "50%",
            }}
          >
            <FontAwesomeIcon
              icon={faMessage}
              style={{ fontSize: "14px", color: "#333333" }} // Larger icon size
            />
          </IconButton>
          <IconButton
            sx={{
              padding: "6px",
              borderRadius: "50%",
            }}
          >
            <FontAwesomeIcon
              icon={faChartColumn}
              style={{ fontSize: "14px", color: "#333333" }}
            />
          </IconButton>
          <IconButton
            sx={{
              padding: "6px",
              borderRadius: "50%",
            }}
          >
            <FontAwesomeIcon
              icon={faLink}
              style={{ fontSize: "14px", color: "#333333" }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Column 3: 3-Bar Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          height: "100%",
          position: "relative",
          paddingRight: "8px"
        }}
      >
        <IconButton sx={{ padding: "4px", borderRadius: "50%", position: "relative" }}>
          <FontAwesomeIcon
            icon={faBars}
            style={{ fontSize: "12px", color: "#333333" }}
          />
        </IconButton>
      </Box>
    </Card>
  );
}