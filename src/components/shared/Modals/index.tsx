import AuthForm from "@/components/pages/Auth";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { setSignInModal } from "@/redux/modals/modalsSlice";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const Modals = () => {
  const dispatch = useDispatch();
  const { signInModal } = useAppSelector((state) => state.modals);
  const { isPhone } = useDeviceIndicator();
  return (
    <>
      {!isPhone && (
        <Dialog
          open={signInModal}
          onOpenChange={(o) => dispatch(setSignInModal({ open: o }))}
        >
          <DialogContent className="!p-0 !border-none md:w-fit">
            <AuthForm />
          </DialogContent>
        </Dialog>
      )}
      {isPhone && (
        <Drawer
          open={signInModal}
          onOpenChange={(o) => dispatch(setSignInModal({ open: o }))}
        >
          <DrawerContent className="h-full max-h-full rounded-none flex items-center justify-center flex-col gap-12 dark:bg-black bg-white">
            <AuthForm isDrawer />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Modals;
