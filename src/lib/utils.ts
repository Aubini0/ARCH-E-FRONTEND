import Keys from "@/config/keys";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const queryToString = (text: string | string[] | undefined | any, arrayReturn: "first" | "last" | "joined" = "first", arrayJoinSeparator: string = ",") => {
  if (text === undefined) {
    return "";
  }
  if (typeof text === "string") {
    return text;
  }
  if (Array.isArray(text)) {
    switch (arrayReturn) {
      case "first":
        return text[0];
      case "last":
        return text[text.length - 1];
      case "joined":
        return text.join(arrayJoinSeparator);
    }
  }
  return "";
};

export function numberSentences(text: string) {
  const sentences = text.split(".").filter((sentence) => sentence.trim().length > 0);

  const numberedSentences = sentences.map((sentence, index) => {
    const sentenceNumber = index + 1;
    return `<span class="sentence-number">${sentenceNumber}</span> <span>${sentence.trim()}</span><span>.</span><br /><br />`;
  });

  return numberedSentences.join(" ");
}

export function getWebSocketURL(path = "") {
  const protocolPrefix = "wss:";
  const host = Keys.SOCKET_BASE_URL; // Includes hostname and port

  return protocolPrefix + "//" + host + path;
}

export function getYouTubeId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== "www.youtube.com" && urlObj.hostname !== "youtube.com") {
      return null;
    }

    const videoId = urlObj.searchParams.get("v");
    return videoId && videoId.length === 11 ? videoId : null;
  } catch (error) {
    // Handle any errors, such as invalid URLs
    return null;
  }
}

export const groupByDateRange = <T>(data: T[]) => {
  const today = new Date();

  // Calculate previous date ranges
  const previous7Days = new Date(today);
  previous7Days.setDate(today.getDate() - 7);

  const previous30Days = new Date(today);
  previous30Days.setDate(today.getDate() - 30);

  const previous3Months = new Date(today);
  previous3Months.setMonth(today.getMonth() - 3);

  const previous6Months = new Date(today);
  previous6Months.setMonth(today.getMonth() - 6);

  // Initialize the groups
  const groups: { title: string; items: T[] }[] = [
    { title: "Previous 7 days", items: [] },
    { title: "Previous 30 days", items: [] },
    { title: "Previous 3 months", items: [] },
    { title: "Previous 6 months", items: [] },
    { title: "Lifetime", items: [] },
  ];

  // Group the items based on their created_at date
  data.forEach((item) => {
    const createdAt = new Date((item as any).created_at);

    if (createdAt >= previous7Days) {
      groups[0].items.push(item);
    } else if (createdAt >= previous30Days) {
      groups[1].items.push(item);
    } else if (createdAt >= previous3Months) {
      groups[2].items.push(item);
    } else if (createdAt >= previous6Months) {
      groups[3].items.push(item);
    } else {
      groups[4].items.push(item); // Anything older falls into "Lifetime"
    }
  });

  return groups;
};
