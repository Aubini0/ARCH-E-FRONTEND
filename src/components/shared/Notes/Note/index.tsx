import { ICreateNote } from "@/types/common";
import React, { FC, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { TfiTrash } from "react-icons/tfi";
import { useDebounce } from "use-debounce";

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
  const [clicked, setClicked] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(note.text);
  const [value] = useDebounce(text, 1000);

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
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onFocus={() => setClicked(true)}
        onBlur={() => setClicked(false)}
        tabIndex={0}
        className="__notes_drag relative w-[200px] bg-[#FDF7BB] border border-[#D1D1D0] h-[200px] p-5 cursor-grab"
        style={{ zoom: "100%", zIndex: note.zIndex }}
      >
        <textarea
          ref={ref}
          className="w-full hide text-xs font-medium placeholder:text-xs hide-scrollbar h-full placeholder:font-medium text-[#848585] border-none outline-none bg-transparent resize-none"
          placeholder="add text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {clicked && (
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
              handleDeleteNote(note.id);
              console.log("clicked");
            }}
            className="absolute z-5 __note_delete cursor-pointer top-1 right-1"
          >
            <TfiTrash className="text-red-500" />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Note;
