import AuthForm from "@/components/pages/Auth";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { setSignInModal } from "@/redux/modals/modalsSlice";
import { useAppSelector } from "@/store/hooks";
import React from "react";

const Modals = () => {
  const { signInModal } = useAppSelector((state) => state.modals);
  return (
    <>
      <Dialog
        open={signInModal}
        onOpenChange={(o) => setSignInModal({ open: o })}
      >
        <DialogContent className="!p-0 !border-none w-fit">
          <AuthForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modals;
