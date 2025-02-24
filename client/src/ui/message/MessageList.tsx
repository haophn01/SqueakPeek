import { useMessage } from "@/lib/store/message";
import { useProfile } from "@/lib/store/profile";
import { DateDivider } from "./DateDivider";
import { MessageCard } from "./MessageCard";
import { memo } from "react";
interface MessageListProps {
  isPageBottomFlushed: boolean;
  scrollDown: () => void;
}
/**
 * Handles rendering a list of messages from zustand store
 * Handles when DateDivider component is rendered
 * @param {boolean} isPageBottomFlushed - Used to determine if DateDivider is rendered
 * @param {() => void} scrollDown - A function that scrolls the page down when invoked
 */
export const MessageList = memo(function MessageList({
  isPageBottomFlushed,
  scrollDown,
}: MessageListProps) {
  const { messages } = useMessage();
  const { profile } = useProfile();

  // determines if DateDivider should be rendered
  function doRenderDateDivider(
    index: number,
    currentDate: Date,
    prevDate?: Date
  ): boolean {
    if (index === 0) return true;
    if (currentDate.getDay() !== prevDate?.getDay()) return true;
    return false;
  }

  return messages.map((message, index) => {
    const doScrollDown =
      (index === messages.length - 1 &&
        profile?.username === message.sender_username) ||
      isPageBottomFlushed;
    let prevDate: undefined | Date;
    if (index > 0) prevDate = new Date(messages[index - 1].timestamp);
    return (
      <div key={message.messageId}>
        {doRenderDateDivider(index, new Date(message.timestamp), prevDate) && (
          <DateDivider messageDate={new Date(message.timestamp)} />
        )}
        <MessageCard
          {...message}
          scrollDown={doScrollDown ? scrollDown : undefined}
        />
      </div>
    );
  });
});
