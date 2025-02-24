import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import { createSupabaseClient } from "../supabase/client";

/**
 * Fetches messages from a company thread table or the  private message table depending on the isPrivateConversation param
 * @param conversation_id- ID of the conversation which the messages are inserted into
 * @param isPrivateConversation - Boolean value used to determine which conversation type the message is inserted into
 * @param supabase - supabase client to make supabase queries

 * @returns {data: messages, error: Postgress error} - data contains the messages from the conversation
 */
export async function fetchMessages(
  conversation_id: string,
  isPrivateConversation: boolean,
  supabase: SupabaseClient = createSupabaseClient()
) {
  if (isPrivateConversation) {
    const res = await supabase
      .from("private_message")
      .select(
        `
      *,
      private_conversation!inner()
    `
      )
      .eq("private_conversation.conversation_id", conversation_id);

    const { error } = res;
    const data =
      res.data as Database["public"]["Tables"]["public_message"]["Row"][];
    if (error) {
      console.error(error);
    }
    return { data, error };
  } else {
    const res = await supabase
      .from("public_message")
      .select(
        `
        *,
        company_thread!inner()
      `
      )
      .eq("company_thread.thread_id", conversation_id);

    const { error } = res;
    const data =
      res.data as Database["public"]["Tables"]["public_message"]["Row"][];
    if (error) {
      console.error(error);
    }
    return { data, error };
  }
}
