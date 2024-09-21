import { AnimatedInput } from "@/components/ui/animated-input";
import { Button } from "@/components/ui/button";
import { emailRegex } from "@/constants/regex";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CiCamera } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/authSlice";
import { useRouter } from "next/router";
import { FileWithPath, useDropzone } from "react-dropzone";
import { FileWithPreview, ImageCropper } from "@/components/ui/image-cropper";
import { useAppSelector } from "@/store/hooks";
import { useEditProfile } from "@/hooks/api/auth";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

type FormType = z.infer<typeof formSchema>;

interface IEditProfileModal {
  handleClose: () => void;
}

const EditProfileModal: FC<IEditProfileModal> = ({ handleClose }) => {
  const [selectedFile, setSelectedFile] = React.useState<FileWithPreview | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);

  const [edit, setEdit] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      if (!file) {
        alert("Selected image is too large!");
        return;
      }

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedFile(fileWithPreview);
      setDialogOpen(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { mutateAsync: editProfile, status } = useEditProfile();

  const queryClient = useQueryClient();

  useEffect(() => {
    reset({
      name: user?.full_name,
    });
  }, [user]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    noClick: true,
  });

  const { control, handleSubmit, reset, getValues } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormType) => {
    try {
      const formData = new FormData();
      formData.append("full_name", data.name);
      if (croppedImage) {
        formData.append("file", croppedImage);
      }
      await editProfile(formData);
      handleClose();
      queryClient.refetchQueries({ queryKey: "current_user" });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const dispatch = useDispatch();

  return (
    <div
      {...getRootProps()}
      className={cn(
        "text-black flex-1 flex flex-col justify-center bg-white border-2 border-gray-200 dark:border-transparent dark:bg-dark-background dark:text-white w-full md:w-[400px] relative rounded-3xl font-poppins py-10",
        isDragActive && "border-dashed !border-primary"
      )}
    >
      <div className="absolute right-0 top-3">
        <Button onClick={() => setEdit(true)} type="submit" variant={"ghost"} className="w-full bg-transparent border-none text-[#0089D0] outline-none hover:!bg-transparent">
          Edit Profile
        </Button>
      </div>
      {edit ? (
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="cursor-pointer mx-auto w-[80px] h-[80px] min-w-[80px] min-h-[80px] relative">
            <div className="w-full h-full max-w-full max-h-full overflow-hidden relative">
              <Avatar className="w-full h-full">
                <AvatarImage src={croppedImage ? URL.createObjectURL(croppedImage) : user?.profilePic} alt={user?.full_name} />
                <AvatarFallback className="flex items-center justify-center w-full h-full text-lg bg-secondary">{user?.full_name[0]}</AvatarFallback>
              </Avatar>
              <ImageCropper setCroppedImage={setCroppedImage} dialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
              <input type="file" {...getInputProps()} className="hidden" />
            </div>
            <div onClick={() => open()} className="absolute rounded-full z-50 -right-0 -bottom-0 bg-secondary flex items-center justify-center w-[24px] h-[24px]">
              <CiCamera />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="cursor-pointer mx-auto w-[80px] h-[80px] min-w-[80px] min-h-[80px] relative">
            <div className="w-full h-full max-w-full max-h-full overflow-hidden relative">
              <Avatar className="w-full h-full">
                <AvatarImage src={croppedImage ? URL.createObjectURL(croppedImage) : user?.profilePic} alt={user?.full_name} />
                <AvatarFallback className="flex items-center justify-center w-full h-full text-lg bg-secondary">{user?.full_name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      )}
      <div className="px-10">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {edit ? (
            <div>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => <AnimatedInput {...field} error={fieldState.error} autoComplete="off" label="Name" type="text" placeholder="Enter your name" />}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <p className={cn("dark:text-[#848585] text-black font-inter text-xs font-medium leading-[16px]")}>Name</p>
              <p className={cn("dark:text-white text-black font-inter text-sm font-normal leading-[16px]")}>{user?.full_name}</p>
            </div>
          )}
          <div className="space-y-2">
            <p className={cn("dark:text-[#848585] text-black font-inter text-xs font-medium leading-[16px]")}>Email</p>
            <p className={cn("dark:text-white text-black font-inter text-sm font-normal leading-[16px]")}>{user?.email}</p>
          </div>
          <div className="flex flex-col !mt-6 gap-1">
            {edit && (
              <Button isLoading={status === "loading"} type="submit" className="w-full">
                Save profile
              </Button>
            )}
            <Button
              type="button"
              onClick={() => {
                dispatch(logout());
                router.push("/auth/login");
              }}
              variant={"ghost"}
              className="w-full bg-transparent border-none text-[#FF3838] outline-none hover:!bg-transparent"
            >
              Log Out
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
