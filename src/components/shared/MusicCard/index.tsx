import React, { FC, HTMLAttributes } from "react";
import {
  Card,
  CardBody,
  Image,
  Button,
  Slider,
  CardProps,
} from "@nextui-org/react";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { RepeatOneIcon } from "@/components/icons/RepeatOneIcon";
import { PreviousIcon } from "@/components/icons/PreviousIcon";
import { PauseCircleIcon } from "@/components/icons/PauseCircleIcon.tsx";
import { NextIcon } from "@/components/icons/NextIcon";
import { ShuffleIcon } from "@/components/icons/ShuffleIcon";
import { cn } from "@/lib/utils";
import { VscShare } from "react-icons/vsc";

interface IMusicCard extends CardProps {}

const MusicCard: FC<IMusicCard> = (props) => {
  const [liked, setLiked] = React.useState(false);

  return (
    <Card
      shadow="sm"
      isBlurred
      {...props}
      className={cn(
        "border-none bg-transparent shadow-none md:shadow-sm md:bg-secondary w-full md:max-w-[700px]",
        props.className
      )}
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-y-8 mt-12 md:mt-0 gap-x-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <img
              alt="Album cover"
              className="object-cover shadow-md aspect-[1/1] w-full rounded-xl"
              src="https://nextui.org/images/album-cover.png"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-center mt-1 mb-4 md:mb-0">
              <div className="flex flex-col gap-0">
                <h1 className="text-lg font-medium">Artist</h1>
                <span className="text-sm">Song Title</span>
              </div>
              <Button
                isIconOnly
                className="text-white hover:bg-white/10"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>

            <div className="flex flex-col mt-3 mb-5 md:mb-0 gap-1">
              <Slider
                aria-label="Music progress"
                classNames={{
                  track: "bg-background h-[7px] !border-0",
                  thumb: "w-4 h-4 after:w-4 after:h-4 after:bg-white",
                  filler: "bg-white rounded-tl-full rounded-bl-full",
                }}
                defaultValue={33}
                size="md"
              />
              <div className="flex justify-between mt-1">
                <p className="text-[10px] tracking-widest">1:23</p>
                <p className="text-[10px] tracking-widest">- 4:32</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-between">
              <Button
                isIconOnly
                className="data-[hover]:bg-white/10"
                radius="full"
                variant="light"
              >
                <RepeatOneIcon className="text-white/80" />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-white/10"
                radius="full"
                variant="light"
              >
                <PreviousIcon className="text-white/80" />
              </Button>
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-white/10"
                radius="full"
                variant="light"
              >
                <PauseCircleIcon size={54} className="text-white/80" />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-white/10"
                radius="full"
                variant="light"
              >
                <NextIcon className="text-white/80" />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-white/10"
                radius="full"
                variant="light"
              >
                <ShuffleIcon className="text-white/80" />
              </Button>
            </div>
            <div className="flex w-full items-center px-1 md:px-2 mt-10 md:mt-3 justify-end">
              <VscShare className="text-2xl md:text-lg" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MusicCard;
