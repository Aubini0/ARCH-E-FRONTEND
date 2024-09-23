import * as React from "react";

import { EditorContent } from "@tiptap/react";
import type { Content, Editor } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SectionOne } from "./section/one";
import { SectionTwo } from "./section/two";
import { SectionThree } from "./section/three";
import { SectionFour } from "./section/four";
import { SectionFive } from "./section/five";
import { LinkBubbleMenu } from "./bubble-menu/link-bubble-menu";
import { ImageBubbleMenu } from "./bubble-menu/image-bubble-menu";
import type { UseMinimalTiptapEditorProps } from "@/hooks/use-minimal-tiptap";
import { useMinimalTiptapEditor } from "@/hooks/use-minimal-tiptap";
import { ScrollShadow } from "@nextui-org/react";

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
  moreOptions?: React.ReactNode;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Toolbar = ({ editor, moreOptions }: { editor: Editor; moreOptions?: React.ReactNode }) => (
  <div className="shrink-0 overflow-x-auto toolbar-scroll border-t border-border p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />

      <SectionTwo editor={editor} activeActions={["bold", "italic"]} mainActionCount={2} />

      <SectionThree editor={editor} />

      <SectionFour editor={editor} activeActions={["orderedList", "bulletList"]} mainActionCount={0} />

      <SectionFive editor={editor} activeActions={[]} mainActionCount={0} />

      {moreOptions}
    </div>
  </div>
);

export const MinimalTiptapEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(({ value, onChange, className, editorContentClassName, moreOptions, containerProps, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <div {...containerProps} ref={ref} className={cn("flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm", className, containerProps?.className)}>
      <ScrollShadow offset={100} size={100} visibility="top" hideScrollBar className="w-full h-full">
        <EditorContent editor={editor} className={cn("minimal-tiptap-editor text-black hide-scrollbar", editorContentClassName)} />
      </ScrollShadow>
      <LinkBubbleMenu editor={editor} />
      <ImageBubbleMenu editor={editor} />
      <Toolbar editor={editor} moreOptions={moreOptions} />
    </div>
  );
});

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

export default MinimalTiptapEditor;
