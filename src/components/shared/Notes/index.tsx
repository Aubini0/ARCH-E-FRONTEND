import { useWindowHeight } from "@react-hook/window-size";
import React, { FC } from "react";
import Draggable from "react-draggable";

interface INotes {
  notes: {
    text: string;
    position: { x: number; y: number };
    id: string;
    zIndex: number;
  }[];
  handlePositionChange: (data: { x: number; y: number; id: string }) => void;
}

const Notes: FC<INotes> = ({ notes, handlePositionChange }) => {
  console.log(notes);
  return (
    <div style={{ zoom: "130%" }} className="fixed right-12 top-44">
      {notes.map((note) => (
        <Draggable
          onDrag={(e, ui) => {
            handlePositionChange({ id: note.id, x: note.position.x + ui.deltaX, y: note.position.y + ui.deltaY });
          }}
          position={{ x: note.position.x, y: note.position.y }}
          handle=".__notes_drag"
        >
          <div className="__notes_drag relative w-[170px] bg-[#FDF7BB] border border-[#D1D1D0] h-[170px] p-5 cursor-grab" style={{ zoom: "100%", zIndex: note.zIndex }}>
            <textarea
              className="w-full hide text-base font-medium placeholder:text-base hide-scrollbar h-full placeholder:font-medium text-[#848585] border-none outline-none bg-transparent resize-none"
              placeholder="add text..."
              //   value={note.text}
            ></textarea>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default Notes;
