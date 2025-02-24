"use client";
import { Typography, Tabs, Tab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  faBuilding as solidBuilding,
  faMessage as solidMessage,
} from "@fortawesome/free-solid-svg-icons";

import {
  faBuilding as regularBuilding,
  faMessage as regularMessage,
} from "@fortawesome/free-regular-svg-icons";

import { usePathname } from "next/navigation";
import { MessageNotificationCardProps } from "./MessageNotificationCard";
import { MessageNotificationCardList } from "./MessageNotificationCardList";
import { fetchPrivateConversations } from "@/lib/utils/fetchPrivateConversations";
import { useProfile } from "@/lib/store/profile";
import { Database } from "@/lib/types/database.types";
/**
 * Allows the user to navigate between company threads or private messages in the message page
 */
export function SideNav() {
  const { profile } = useProfile();
  const pathName = usePathname();
  const tabs = [
    {
      label: "Company Threads",
      tabPathName: "company",
      solidIcon: solidBuilding,
      regularIcon: regularBuilding,
    },
    {
      label: "Private",
      tabPathName: "private",
      solidIcon: solidMessage,
      regularIcon: regularMessage,
    },
  ];
  const router = useRouter();
  const currentTab = pathName.split("/")[2]; // tab is either company or private
  const [messageNotificationsList, setMessageNotificationsList] = useState<
    MessageNotificationCardProps[]
  >([]);

  useEffect(() => {
    if (profile) {
      if (currentTab === "private") {
        fetchPrivateConversations(profile.profile_id).then((res) => {
          const { data, error } = res;
          if (error) {
          } else if (data) {
            const mappedData: MessageNotificationCardProps[] = data.map(
              (item) => {
                const { conversation_id } = item;
                const { avatar, username } =
                  item.profile as unknown as Database["public"]["Tables"]["profile"]["Row"]; // it returns profile as an array of profiles
                return {
                  avatar: avatar,
                  conversation_id,
                  header: username,
                  subHeader: "",
                };
              }
            );
            setMessageNotificationsList(mappedData);
          } else {
            setMessageNotificationsList([]);
          }
        });
      } else {
        //TODO: Fetch bookmarked opportunities here
        setMessageNotificationsList([
          {
            avatar: "test",
            conversation_id: "amazon_conversationid",
            header: "Amazon",
            subHeader: "Backend Engineer",
          },
          {
            avatar: "test",
            conversation_id: "netflix_conversationid",
            header: "Netflix",
            subHeader: "Software Engineer Intern",
          },
        ]);
      }
    }
  }, [pathName, currentTab, profile]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRight: "3px solid #E0E4F2",
      }}
    >
      {" "}
      <div
        style={{
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          Messages
        </Typography>
        <Typography>
          Talk to other applicants in the process, or talk privately
        </Typography>
        <Tabs
          value={currentTab}
          TabIndicatorProps={{
            hidden: true,
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            "&.Mui-selected": {
              color: "yellow",
              opacity: 1,
            },
            "&.Mui-focusVisible": {
              backgroundColor: "#d1eaff",
            },
          }}
        >
          {tabs.map(({ tabPathName, solidIcon, regularIcon, label }) => (
            <Tab
              value={tabPathName}
              key={tabPathName}
              sx={{
                padding: "0px",
                marginRight: "20px",
                "&.Mui-selected": {
                  color: "#496FFF",
                },
              }}
              icon={
                <FontAwesomeIcon
                  size="2x"
                  icon={
                    currentTab === tabPathName // gets the route name after the /message route
                      ? solidIcon
                      : regularIcon
                  }
                />
              }
              onClick={() => router.push(`/message/${tabPathName}`)}
              label={label}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </div>
      <MessageNotificationCardList list={messageNotificationsList} />
    </div>
  );
}
