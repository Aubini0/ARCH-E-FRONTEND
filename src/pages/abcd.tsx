import MinimalTiptapEditor from "@/components/ui/tiptap-text-editor";
import { cn } from "@/lib/utils";
import React from "react";

const abcd = () => {
  return (
    <MinimalTiptapEditor
      throttleDelay={2000}
      className={cn("h-full min-h-0 w-full rounded-xl")}
      editorContentClassName="overflow-auto"
      output="html"
      placeholder="Type your description here..."
      immediatelyRender={true}
      editable={true}
      injectCSS={true}
      editorClassName="focus:outline-none p-5"
    />
  );
};

export default abcd;
