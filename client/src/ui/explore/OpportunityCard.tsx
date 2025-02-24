"use client";

import { Database } from "@/lib/types/database.types";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  faAnglesUp,
  faAnglesDown,
  faComment,
  faReply,
  faBookmark,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { OpportunityStackedBarGraph } from "./OpportunityStackedBarGraph";
import Link from "next/link";

interface jobStats {
  status: string;
  color: string;
  quantity: number;
}

// TODO: Replace this with the actual database type
interface Aggregate {
  rejected: number;
  interviewing: number;
  offered: number;
  totalApplied: number;
  oa: number;
  messages: number;
}

export interface OpportunityCardProps {
  conversation_id: string;
  opportunity: Database["public"]["Tables"]["opportunity"]["Row"];
  aggregate: Aggregate;
}

export function OpportunityCard({
  conversation_id,
  opportunity,
  aggregate,
}: OpportunityCardProps) {
  // TODO: Replace this with real status from props
  const appliedStatus = false;
  const hiringStatus = false;

  // TODO: Add real quantity
  // Array for mapping the job stats
  const stats: jobStats[] = [
    {
      status: "Rejected:",
      color: "red",
      quantity: 12,
    },
    {
      status: "OA:",
      color: "orange",
      quantity: 12,
    },
    {
      status: "Interviewing:",
      color: "gold",
      quantity: 12,
    },
    {
      status: "Offered:",
      color: "green",
      quantity: 12,
    },
  ];

  const { company_name, role_title, type } = opportunity;
  const { rejected, interviewing, offered, totalApplied, oa, messages } =
    aggregate;
  const [bookmarked, setBookmarked] = useState(false);
  const isAppliedColor = appliedStatus ? "green" : "red";
  const isHiringColor = hiringStatus ? "green" : "red";

  const handleBookmark = () => {
    setBookmarked((prev) => !prev); // Toggle the bookmark state
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: role_title,
          text: `Check out this job opportunity for ${role_title} at ${company_name}.`,
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <Card
      style={{
        border: "solid 3px #e0e4f2",
        margin: "1.5rem 0",
        borderRadius: "20px",
        padding: ".75rem 2rem",
      }}
    >
      {/* Card Header in a div with Bookmark */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
          padding: ".5rem 0rem",
        }}
      >
        {/* TODO: Add real header */}
        <CardHeader
          style={{ margin: 0, padding: ".5rem", height: "2rem" }}
          avatar={
            <Avatar
              src={"https://www.amazon.com/favicon.ico"}
              style={{ margin: 0 }}
            ></Avatar>
          }
          title={company_name}
          subheader={
            // Job Postion and Job Type in header

            role_title + " " + type
          }
        />

        {/* Button to threads and button to share Still in progress */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            padding: "0 .5rem",
            margin: 0,
          }}
        >
          <Link href={`/message/company/${conversation_id}`}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#496FFF",
                height: "40px",
                width: "auto",
                borderRadius: "20px",
                boxShadow: "none",
              }}
            >
              <FontAwesomeIcon icon={faComment} />
              <Typography style={{ color: "white", marginLeft: ".5rem" }}>
                {messages}
              </Typography>
            </Button>
          </Link>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#496FFF",
              height: "40px",
              width: "auto",
              borderRadius: "20px",
              boxShadow: "none",
            }}
          >
            <FontAwesomeIcon icon={faChartColumn} />
            <Typography style={{ color: "white", marginLeft: ".5rem" }}>
              Stats
            </Typography>
          </Button>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#496FFF",
              height: "40px",
              width: "auto",
              borderRadius: "20px",
              boxShadow: "none",
            }}
            onClick={handleShareClick}
          >
            <FontAwesomeIcon icon={faReply} />
            <Typography
              variant="subtitle1"
              style={{ color: "white", marginLeft: ".5rem" }}
            >
              Share
            </Typography>
          </Button>

          {/* Bookmark button */}
          <IconButton
            onClick={handleBookmark}
            sx={{ "&:hover": { background: "none" } }}
          >
            <FontAwesomeIcon
              icon={bookmarked ? faBookmark : regularBookmark}
              style={{ fontSize: "2.5rem" }}
              color="#496FFF"
            />
          </IconButton>
        </div>
      </div>

      <CardContent
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Opporunity status and user relative opportunity status */}
        <div
          style={{
            display: "flex",
            margin: 0,
            padding: ".5rem 0rem",
            gap: "1rem",
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          <Chip
            label={appliedStatus ? "Applied" : "Not Applied"}
            variant="outlined"
            style={{
              color: isAppliedColor,
              borderColor: isAppliedColor,
              margin: 0,
            }}
          />

          <Chip
            icon={
              <FontAwesomeIcon
                style={{
                  marginLeft: ".5rem",
                  color: isHiringColor,
                }}
                icon={hiringStatus ? faAnglesUp : faAnglesDown}
              />
            }
            label={hiringStatus ? "Actively Hiring" : "Not Hiring"}
            variant="outlined"
            style={{
              color: isHiringColor,
              borderColor: isHiringColor,
              margin: 0,
            }}
          />
        </div>

        {/* Opportunity stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem 3rem ",
            gap: "1rem",
            margin: "0",
          }}
        >
          {stats.map((stats) => (
            <Chip
              key={stats.status}
              label={`${stats.status} ${stats.quantity}`}
              variant="outlined"
              style={{
                color: stats.color,
                borderColor: stats.color,
                margin: 0,
                width: "150px",
              }}
            />
          ))}
        </div>

        {/* Stacked Bar Graph For Stat Visual */}
        <div
          style={{
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <OpportunityStackedBarGraph
            rejected={rejected}
            oa={oa}
            interviewing={interviewing}
            offered={offered}
          />
        </div>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Total Applied: {totalApplied}
        </Typography>
      </CardContent>
    </Card>
  );
}
