import Keys from "@/config/keys";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { MinimalTiptapProps } from "@/components/ui/tiptap-text-editor";

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

export const groupByDateRangeUnspecifiedTz = <T>(data: T[]) => {
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
    const createdAt = new Date(addTimezoneUTC((item as any).created_at));

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

export function addTimezoneUTC(dateStr: Date | string) {
  const str = dateStr.toString();
  if (str.endsWith("Z") || str.endsWith("+00:00")) {
    return dateStr;
  }

  return dateStr + "+00:00";
}

export function formatSources(str: string) {
  // Update the regex to match different possible formats
  const text = str.replace(/\(Source(?: \[?(\d+)\]?)? ?(?:\[(.*?)\]\((.*?)\)|([^\)]+))\)/g, (match, n, urlName, url, urlFallback) => {
    // Use urlFallback if url is undefined (for cases without a markdown-style URL)
    const finalUrl = url || urlFallback;

    // Return the modified string with the appropriate href and span elements
    return finalUrl ? `<a class="inline-source" href="${finalUrl}" target="_blank"><span>${n || ""}</span></a>` : match; // Return the original match if no URL is found
  });

  return text;
}

export function dataURItoBlob(dataURI: string) {
  var byteString = atob(dataURI.split(",")[1]);

  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

import type { Editor } from "@tiptap/core";

let isMac: boolean | undefined;

interface Navigator {
  userAgentData?: {
    brands: { brand: string; version: string }[];
    mobile: boolean;
    platform: string;
    getHighEntropyValues: (hints: string[]) => Promise<{
      platform: string;
      platformVersion: string;
      uaFullVersion: string;
    }>;
  };
}

function getPlatform(): string {
  const nav = navigator as Navigator;

  if (nav.userAgentData) {
    if (nav.userAgentData.platform) {
      return nav.userAgentData.platform;
    }

    nav.userAgentData.getHighEntropyValues(["platform"]).then((highEntropyValues) => {
      if (highEntropyValues.platform) {
        return highEntropyValues.platform;
      }
    });
  }

  if (typeof navigator.platform === "string") {
    return navigator.platform;
  }

  return "";
}

export function isMacOS() {
  if (isMac === undefined) {
    isMac = getPlatform().toLowerCase().includes("mac");
  }

  return isMac;
}

interface ShortcutKeyResult {
  symbol: string;
  readable: string;
}

export function getShortcutKey(key: string): ShortcutKeyResult {
  const lowercaseKey = key.toLowerCase();
  if (lowercaseKey === "mod") {
    return isMacOS() ? { symbol: "⌘", readable: "Command" } : { symbol: "Ctrl", readable: "Control" };
  } else if (lowercaseKey === "alt") {
    return isMacOS() ? { symbol: "⌥", readable: "Option" } : { symbol: "Alt", readable: "Alt" };
  } else if (lowercaseKey === "shift") {
    return isMacOS() ? { symbol: "⇧", readable: "Shift" } : { symbol: "Shift", readable: "Shift" };
  } else {
    return { symbol: key, readable: key };
  }
}

export function getShortcutKeys(keys: string[]): ShortcutKeyResult[] {
  return keys.map((key) => getShortcutKey(key));
}

export function getOutput(editor: Editor, format: MinimalTiptapProps["output"]) {
  if (format === "json") {
    return editor.getJSON();
  }

  if (format === "html") {
    return editor.getText() ? editor.getHTML() : "";
  }

  return editor.getText();
}

export function formatTimeRange(timeObj: { start?: string; end?: string }) {
  // Function to convert 24-hour time to 12-hour format
  function convertTo12Hour(timeStr: string) {
    let [hours, minutes]: any = timeStr.split(":");
    hours = parseInt(hours);

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format, handling midnight and noon

    return `${hours}:${minutes} ${period}`;
  }

  const startTime = convertTo12Hour(timeObj.start || "");
  const endTime = convertTo12Hour(timeObj.end || "");

  return `${startTime} - ${endTime}`;
}

export function createDateObjectFromTimeString(timeStr: string) {
  // Get the current date
  const currentDate = new Date();

  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);

  // Set the hours, minutes, and seconds of the current date
  currentDate.setHours(hours, minutes, seconds, 0); // Set milliseconds to 0

  return currentDate;
}
