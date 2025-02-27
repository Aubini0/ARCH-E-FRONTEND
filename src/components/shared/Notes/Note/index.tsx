import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MinimalTiptapEditor from "@/components/ui/tiptap-text-editor";
import ToolbarButton from "@/components/ui/tiptap-text-editor/toolbar-button";
import { cn } from "@/lib/utils";
import { ICreateNote } from "@/types/common";
import React, { FC, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDropzone } from "react-dropzone";
import { TfiTrash } from "react-icons/tfi";
import { useDebounce } from "use-debounce";
import { useClickAway } from "@uidotdev/usehooks";
import { ScrollShadow } from "@nextui-org/react";

interface INote {
  note: {
    text: string;
    position: { x: number; y: number };
    id: string;
    zIndex: number;
  };
  handlePositionChange: (data: { x: number; y: number; id: string }) => void;
  handleDeleteNote: (id: string) => void;
  handleUpdateNoteOnServer: (data: ICreateNote, id: string) => void;
}

const Note: FC<INote> = ({ handlePositionChange, note, handleDeleteNote, handleUpdateNoteOnServer }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(note.text);
  const [value] = useDebounce(text, 1000);

  const scrollRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<"view" | "edit">("view");

  const { open } = useDropzone({
    accept: {
      "image/*": [],
    },
  });

  const clickoutref = useClickAway<any>(() => {
    console.log("clicked outside");
    setMode("view");
  });

  useEffect(() => {
    handleUpdateNoteOnServer({ x_position: note.position.x, y_position: note.position.y, text: value, z_position: note.zIndex }, note.id);
  }, [value]);

  return (
    <Draggable
      onDrag={(e, ui) => {
        handlePositionChange({ id: note.id, x: note.position.x + ui.deltaX, y: note.position.y + ui.deltaY });
      }}
      onStop={(e, ui) => {
        handleUpdateNoteOnServer({ x_position: note.position.x + ui.deltaX, y_position: note.position.y + ui.deltaY, text: note.text, z_position: note.zIndex }, note.id);
      }}
      position={{ x: note.position.x, y: note.position.y }}
      handle=".__notes_drag"
      cancel=".__note_delete"
      disabled={mode === "edit"}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={() => {
          setMode("edit");
        }}
        tabIndex={0}
        // className="__notes_drag absolute w-[275px] bg-[#FDF7BB] border border-[#D1D1D0] h-[275px] p-5 cursor-grab"
        className="__notes_drag absolute w-[235px] bg-gradient-to-b from-yellow-100 to-yellow-300 border border-[#D1D1D0] h-[260px] cursor-grab rounded-[24px]"
        style={{ zoom: "100%", zIndex: note.zIndex }}
      >
        {mode === "view" && (
          <ScrollShadow ref={scrollRef} offset={100} size={70} visibility="top" className="p-5 pt-9 w-full h-full overflow-y-auto hide-scrollbar rounded-[24px] text-black">
            <p dangerouslySetInnerHTML={{ __html: text || "Add a note..." }} className="note_html"></p>
          </ScrollShadow>
        )}
        {mode === "edit" && (
          <MinimalTiptapEditor
            ref={clickoutref}
            throttleDelay={2000}
            className={cn("h-full min-h-0 pt-4 w-full rounded-[24px]")}
            editorContentClassName="overflow-auto h-full"
            output="html"
            placeholder="Write a note..."
            immediatelyRender={true}
            editable={true}
            injectCSS={true}
            value={text}
            onChange={(v) => {
              setText(v as string);
            }}
            editorClassName="focus:outline-none p-5"
            // moreOptions={
            //   <>
            //     <Popover>
            //       <PopoverTrigger asChild>
            //         <ToolbarButton>
            //           <MdOutlineEmojiEmotions className="text-lg" />
            //         </ToolbarButton>
            //       </PopoverTrigger>
            //       <PopoverContent className="!p-0 !bg-transparent !border-none !outline-none">
            //         <Picker className="w-[350px] h-[350px]" />
            //       </PopoverContent>
            //     </Popover>
            //     <ToolbarButton onClick={() => open()}>
            //       <FaImage className="text-lg" />
            //     </ToolbarButton>
            //   </>
            // }
          />
        )}

        {mode === "edit" && (
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
              handleDeleteNote(note.id);
              console.log("clicked");
            }}
            className="absolute z-5 __note_delete cursor-pointer top-3 right-3"
          >
            <TfiTrash className="text-red-500 text-xl" />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Note;
