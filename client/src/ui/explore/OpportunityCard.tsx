"use client";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Button,
  Avatar,
  CardActionArea,
} from "@mui/material";
import {
  faAnglesUp,
  faAnglesDown,
  faComment,
  faReply,
  faArrowLeft,
  faArrowRight,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OpportunityTimeline } from "./OpportunityTimeline";

interface OpportunityCardProps {
  id: number;
  title: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  jobPosition: string;
  jobType: string;
  jobAvatar: string;
  positionStatus: boolean;
  userPositionStatus: boolean;
  totalApplied: number;
  rejected: number;
  oa: number;
  interviewing: number;
  offered: number;
  recentMessages: number;
  bookmarked: boolean;
}

interface jobStats {
  status: string;
  color: string;
  quantity: number;
}

export function OpportunityCard({
  title,
  dateRangeStart,
  dateRangeEnd,
  jobPosition,
  jobType,
  jobAvatar,
  positionStatus,
  userPositionStatus,
  totalApplied,
  rejected,
  oa,
  interviewing,
  offered,
  recentMessages,
  bookmarked,
}: OpportunityCardProps) {
  const stats: jobStats[] = [
    {
      status: "Total Applied:",
      color: "black",
      quantity: totalApplied,
    },
    {
      status: "Rejected:",
      color: "red",
      quantity: rejected,
    },
    {
      status: "OA:",
      color: "orange",
      quantity: oa,
    },
    {
      status: "Interviewing:",
      color: "gold",
      quantity: interviewing,
    },
    {
      status: "Offered:",
      color: "green",
      quantity: offered,
    },
  ];

  return (
    <Card
      style={{
        border: "solid 3px #e0e4f2",
        margin: "1.5rem 0",
        borderRadius: "20px",
        padding: "1rem",
      }}
    >
      <CardHeader
        style={{ margin: 0, padding: 8 }}
        avatar={<Avatar src={jobAvatar}></Avatar>}
        title={<Typography>{title}</Typography>}
        subheader={
          <Typography variant="body2">
            {dateRangeStart} - {dateRangeEnd}
          </Typography>
        }
      >
        <FontAwesomeIcon icon={faBookmark}/>
      </CardHeader>
      <Typography variant="h5" sx={{ padding: ".5rem .5rem" }}>
        {jobPosition}, {jobType}
      </Typography>
      <CardContent
        style={{
          display: "flex",
          margin: 0,
          padding: ".5rem .5rem",
          gap: "1rem",
        }}
      >
        <Chip
          label={userPositionStatus ? "Applied" : "Not Applied"}
          variant="outlined"
          sx={{
            color: userPositionStatus ? "green" : "red",
            borderColor: userPositionStatus ? "green" : "red",
          }}
        />

        <Chip
          icon={
            <FontAwesomeIcon
              style={{
                marginLeft: ".5rem",
                color: positionStatus ? "green" : "red",
              }}
              icon={positionStatus ? faAnglesUp : faAnglesDown}
            />
          }
          label={positionStatus ? "Actively Hiring" : "Not Hiring"}
          variant="outlined"
          sx={{
            color: positionStatus ? "green" : "red",
            borderColor: positionStatus ? "green" : "red",
          }}
        />
      </CardContent>
      <CardContent
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "1rem 3rem ",
          gap: "1rem",
        }}
      >
        {stats.map((stats) => (
          <Chip
            key={stats.status}
            label={`${stats.status} ${stats.quantity}`}
            variant="outlined"
            sx={{ color: stats.color, borderColor: stats.color }}
          />
        ))}
      </CardContent>
      {/* Portion for timeline TODO */}

      <CardContent style={{ display: "flex", justifyContent: "center" }}>
        <OpportunityTimeline />
      </CardContent>
      <CardActionArea style={{display: "flex", gap: "1rem", justifyContent: "flex-start", padding: "0 .5rem"}}>
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
            {recentMessages}
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
        >
          <FontAwesomeIcon icon={faReply} />
          <Typography
            variant="subtitle1"
            style={{ color: "white", marginLeft: ".5rem" }}
          >
            Share
          </Typography>
        </Button>
      </CardActionArea>
    </Card>
  );
}
