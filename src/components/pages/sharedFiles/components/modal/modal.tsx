import { Dialog, DialogContent } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  isRename?: boolean;
  value: string;
}
export const NewSpace = ({ open, onClose, isRename, value }: Props) => {
  const [inputVal, setInputVal] = React.useState("");
  React.useEffect(() => {
    setInputVal(value);
  }, [value]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`!p-0 !border-none sm:rounded-[10px] md:h-[190px] md:max-w-[350px] w-full`}>
        <main className="p-[20px]">
          <section className="flex mb-2 justify-between items-center">
            <p className="font-[500]">{isRename ? "Rename Space" : "New Space"}</p>
            <XIcon onClick={onClose} className="cursor-pointer" />
          </section>
          <section className="my-5">
            <input value={inputVal} onChange={(e) => setInputVal(e?.target?.value)} className="h-[40px] w-full px-2 rounded-[5px]" placeholder="Name Your Space..." />
          </section>
          <section className="flex justify-between items-center gap-2">
            <button className="hover:dark:bg-[#2c2929] dark:bg-[#3D3D3D] w-full p-[6px_24px_6px_24px] bg-[#efefef] rounded-[5px]">Save</button>
          </section>
        </main>
      </DialogContent>
    </Dialog>
  );
};
