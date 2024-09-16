import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import { BackgroundComponent } from "../background/backgroundComponent";
import { SharedFilesComponent } from "../sharedFiles";

interface Props {
  open: boolean;
  onClose: (value: boolean) => void;
  isBackground?: boolean;
}
export const Modal = ({ open, onClose, isBackground }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`!p-0 !border-none sm:rounded-[30px] md:h-[740px] ${isBackground ? "md:max-w-[1000px]" : "md:max-w-[1360px]"} w-full`}>{isBackground ? <BackgroundComponent onClose={onClose} /> : <SharedFilesComponent />}</DialogContent>
    </Dialog>
  );
};
