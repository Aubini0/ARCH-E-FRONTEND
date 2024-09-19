import React, { useState } from "react";
import styles from "@/styles/home-styles.module.css";
import useLocalStorage from "use-local-storage";
import Header from "@/components/pages/Home/components/header";
import DateTimeSection from "@/components/pages/Home/components/DateTimeSection";
import RightSection from "@/components/pages/Home/components/RightSection";
import { HomeDock } from "@/components/pages/Home/components/Dock";
import withAuth from "@/hoc/WithAuth";
import Notes from "@/components/shared/Notes";
import { v4 as uuidv4 } from "uuid";

const scaleFactor = 0.8;

const gridPositions = [
  { x: -200 * scaleFactor, y: 100 * scaleFactor },
  { x: -30 * scaleFactor, y: 20 * scaleFactor },
  { x: -30 * scaleFactor, y: -560 * scaleFactor },
  { x: -360 * scaleFactor, y: -810 * scaleFactor },
  { x: -360 * scaleFactor, y: -730 * scaleFactor },
];

const defaultNotes = [
  {
    text: "",
    position: gridPositions[0],
    id: uuidv4(),
    zIndex: 5,
  },
];

const Home = () => {
  const [homePageBg, setHomePageBg] = useLocalStorage("home_bg_image", "");
  const [hideTimer, setHideTimer] = useLocalStorage("timer_hidden", "false");
  const [background, setBackground] = React.useState("");

  const [notes, setNotes] = useState(defaultNotes);
  const [maxZIndex, setMaxZIndex] = useState(0); // To keep track of the highest zIndex

  const addNote = () => {
    const newNoteIndex = notes.length % gridPositions.length;
    const newNote = {
      text: "",
      position: gridPositions[newNoteIndex],
      id: uuidv4(),
      zIndex: maxZIndex - 1, // Assign a lower z-index (newer note goes down)
    };
    setMaxZIndex(maxZIndex - 1); // Decrease maxZIndex
    setNotes([...notes, newNote]);
  };

  const handlePositionChange = ({ x, y, id }: { x: number; y: number; id: string }) => {
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, position: { x, y }, zIndex: maxZIndex + 1 }; // Bring the dragged note to the front
      }
      return note;
    });
    setMaxZIndex(maxZIndex + 1); // Increase max z-index for the dragged note
    setNotes(newNotes);
  };

  const handleDeleteNote = (id: string) => {
    // const newNotes = notes.filter((note) => note.id !== id);
    // setNotes(newNotes);
  };

  // const handleNoteClick = (id: string) => {
  //   const newNotes = notes.map((note) => {
  //     if (note.id === id) {
  //       return { ...note, zIndex: maxZIndex + 1 };
  //     }
  //     return note;
  //   });
  //   setMaxZIndex(maxZIndex + 1);
  //   setNotes(newNotes);
  // };

  React.useEffect(() => {
    const bg = homePageBg ? homePageBg : "/home-background.png";
    setBackground(bg);
  }, [homePageBg]);
  return (
    <div style={{ background: `url(${background})`, backgroundSize: "cover" }} className={styles.homeMain}>
      <div style={{ zoom: "67%" }}>
        <Header />
        <DateTimeSection hideTimer={hideTimer} />
        <RightSection />
        <HomeDock addNote={addNote} setHideTimer={setHideTimer} setHomePageBg={setHomePageBg} />
        <Notes handlePositionChange={handlePositionChange} handleDeleteNote={handleDeleteNote} notes={notes} />
      </div>
    </div>
  );
};

export default withAuth(Home);
