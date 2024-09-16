import { Dialog, DialogContent } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import React from "react";

interface Props {
  open: boolean;
  onClose: (value: boolean) => void;
}
export const ConfirmationModal = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`!p-0 !border-none md:max-w-[450px]`}>
        <main className="p-[20px]">
          <div className="mb-10">
            <section className="flex justify-between items-center mb-7">
              <p className="font-bold text-[30px]">Delete Space</p>
              <XIcon onClick={onClose} className="cursor-pointer" />
            </section>
            <p className="font-semibold text-[20px]">Are you sure you want to delete this space ?</p>
          </div>
          <section className="flex justify-end items-center gap-2">
            <button className="w-fit p-[12px_24px_12px_24px] font-semibold bg-red-600 text-white rounded-[10px]">Confirm</button>
          </section>
        </main>
      </DialogContent>
    </Dialog>
  );
};
