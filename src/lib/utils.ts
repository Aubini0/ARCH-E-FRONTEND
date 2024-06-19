import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const queryToString = (
  text: string | string[] | undefined | any,
  arrayReturn: "first" | "last" | "joined" = "first",
  arrayJoinSeparator: string = ","
) => {
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
  const sentences = text
    .split(".")
    .filter((sentence) => sentence.trim().length > 0);

  const numberedSentences = sentences.map((sentence, index) => {
    const sentenceNumber = index + 1;
    return `<span class="sentence-number">${sentenceNumber}</span> <span>${sentence.trim()}</span><span>.</span><br /><br />`;
  });

  return numberedSentences.join(" ");
}
