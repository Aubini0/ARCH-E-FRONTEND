import React, { useState } from "react";
import styles from "@/styles/home-styles.module.css";
import useLocalStorage from "use-local-storage";
import Header from "@/components/pages/Home/components/header";
import DateTimeSection from "@/components/pages/Home/components/DateTimeSection";
import RightSection from "@/components/pages/Home/components/RightSection";
import { HomeDock } from "@/components/pages/Home/components/Dock";
import withAuth from "@/hoc/WithAuth";
import Notes from "@/components/shared/Notes";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { useCreateNote, useDeleteNote, useGetNotes, useUpdateNote } from "@/hooks/api/notes";
import { ICreateNote, INote } from "@/types/common";
import TasksList from "@/components/shared/TasksList";
import MinimalTiptapEditor from "@/components/ui/tiptap-text-editor";

const scaleFactor = 1.5;

const gridPositions = [
  { x: 0 * scaleFactor, y: 0 * scaleFactor },
  { x: 150 * scaleFactor, y: -170 * scaleFactor },
  { x: 150 * scaleFactor, y: 170 * scaleFactor },
  { x: -150 * scaleFactor, y: -170 * scaleFactor },
  { x: -150 * scaleFactor, y: 170 * scaleFactor },
];

const defaultNotes: any[] = [];

const Home = () => {
  const [homePageBg, setHomePageBg] = useLocalStorage("home_bg_image", "");
  const [hideTimer, setHideTimer] = useLocalStorage("timer_hidden", "false");
  const [background, setBackground] = React.useState("");
  const [notes, setNotes] = useState(defaultNotes);
  const [maxZIndex, setMaxZIndex] = useState(0); // To keep track of the highest zIndex

  const [fullScreen, setFullScreen] = useState(false);

  const [tasksWindowOpen, setTasksWindowOpen] = useState(false);

  const { mutateAsync: createNoteMutateAsync } = useCreateNote();
  const { mutateAsync: deleteNoteMutateAsync } = useDeleteNote();
  const { mutateAsync: updateNoteMutateAsync } = useUpdateNote();

  const { status: notesStatus, data } = useGetNotes({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    onSuccess: (d) => {
      const updatedNotes =
        d.data?.map((note) => {
          return {
            ...note,
            position: {
              x: note.x_position,
              y: note.y_position,
            },
            zIndex: note.z_position,
            // @ts-ignore
            id: note._id,
          };
        }) || [];

      setNotes(updatedNotes);
    },
    queryKey: "notes",
  });

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop(acceptedFiles, fileRejections, event) {},
    noClick: true,
  });

  const addNote = async () => {
    try {
      if (notes.length === 5) return;
      const newNoteIndex = notes.length % gridPositions.length;
      const res = await createNoteMutateAsync({
        text: "",
        x_position: gridPositions[newNoteIndex].x,
        y_position: gridPositions[newNoteIndex].y,
        z_position: maxZIndex - 1,
      });
      const newNote = {
        text: "",
        position: gridPositions[newNoteIndex],
        id: res.data.note_id,
        zIndex: maxZIndex - 1, // Assign a lower z-index (newer note goes down)
      };
      setMaxZIndex(maxZIndex - 1); // Decrease maxZIndex
      setNotes([...notes, newNote]);
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong, please try again later");
    }
  };

  const handlePositionChange = ({ x, y, id }: { x: number; y: number; id: string }) => {
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, position: { x, y }, zIndex: maxZIndex + 1 }; // Bring the dragged note to the front
      }
      return note;
    });
    setMaxZIndex(maxZIndex + 1);
    setNotes(newNotes);
  };

  const handleUpdateNoteOnServer = async (note: ICreateNote, id: string) => {
    try {
      await updateNoteMutateAsync({ data: note, id });
    } catch (error) {
      // toast.error("Something went wrong, please try again later");
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
      await deleteNoteMutateAsync(id);
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong, please try again later");
    }
  };

  React.useEffect(() => {
    const bg = homePageBg ? homePageBg : "/home-background.png";
    setBackground(bg);
  }, [homePageBg]);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div {...getRootProps()} style={{ background: `url(${background})`, backgroundSize: "cover" }} className={cn(styles.homeMain)}>
          <div>
            <input {...getInputProps()} type="file" className="hidden" />
            <Header />
            <DateTimeSection hideTimer={hideTimer} />
            <RightSection />
            <HomeDock setTasksWindowOpen={setTasksWindowOpen} addNote={addNote} setHideTimer={setHideTimer} setHomePageBg={setHomePageBg} />
            <Notes status={notesStatus} handlePositionChange={handlePositionChange} handleUpdateNoteOnServer={handleUpdateNoteOnServer} handleDeleteNote={handleDeleteNote} notes={notes} />
            {tasksWindowOpen && <TasksList />}
          </div>
        </div>
      </ContextMenuTrigger>
      {/* <ContextMenu>

      </ContextMenu> */}
    </ContextMenu>
  );
};

export default withAuth(Home);
