import { AnimatedInput } from "@/components/ui/animated-input";
import { Button } from "@/components/ui/button";
import { emailRegex } from "@/constants/regex";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CiCamera } from "react-icons/ci";

const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string().regex(emailRegex, { message: "Invalid email" }),
});

type FormType = z.infer<typeof formSchema>;

const ProfileModal = () => {
  const { control, handleSubmit, reset, getValues } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <div
      className={cn(
        "text-black flex-1 flex flex-col justify-center bg-white border border-gray-200 dark:border-transparent dark:bg-dark-background dark:text-white w-full md:w-[400px] relative rounded-3xl font-poppins py-10"
      )}
    >
      <div className="absolute right-0 top-3">
        <Button type="submit" variant={"ghost"} className="w-full bg-transparent border-none text-[#0089D0] outline-none hover:!bg-transparent">
          Edit Profile
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="cursor-pointer mx-auto w-[80px] h-[80px] min-w-[80px] min-h-[80px] rounded-full relative">
          <div className="w-full h-full max-w-full max-h-full rounded-full overflow-hidden relative">
            <Image src={"/images/avatar-new.jpeg"} alt="Logo Image" fill className="object-cover" />
          </div>
          <div className="absolute rounded-full z-50 -right-0 -bottom-0 bg-secondary flex items-center justify-center w-[24px] h-[24px]">
            <CiCamera />
          </div>
        </div>
      </div>
      <div className="px-10">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => <AnimatedInput {...field} error={fieldState.error} autoComplete="off" label="Name" type="text" placeholder="Nick Boston" />}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => {
                return <AnimatedInput {...field} autoComplete="off" label="Email" type={"text"} error={error} placeholder="nickboston@example.com" />;
              }}
            />
          </div>
          <div className="flex flex-col !mt-6 gap-1">
            <Button type="submit" className="w-full">
              Save profile
            </Button>
            <Button type="submit" variant={"ghost"} className="w-full bg-transparent border-none text-[#FF3838] outline-none hover:!bg-transparent">
              Log Out
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
