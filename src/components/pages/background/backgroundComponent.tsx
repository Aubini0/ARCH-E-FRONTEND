import { ImageIcon } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import useLocalStorage from "use-local-storage";

interface Props {
    onClose: () => void;
}
export const BackgroundComponent = ({ onClose }: Props) => {
  const [activeBg, setActiveBg] = React.useState(-1);
  const [_, setBackgroundImage] = useLocalStorage("home_bg_image", "");
  const [file, setFile] = useLocalStorage("file", "");
  const handleChangeBg = (active: number) => {
    setActiveBg(active);
  };
  const handleSave = () => {
    if (activeBg < 8) {
      setBackgroundImage(`/backgroundImages/${activeBg + 1}.jpg`);
    } else {
      setBackgroundImage("/home-background.png");
    }
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.length && e?.target?.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e?.target?.result;
        setFile(`${fileContent}`);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <main className="px-[32px] py-[24px] h-full overflow-auto">
      <section className="mb-[40px]">
        <div className="flex items-center justify-between">
          <p className="font-[500] text-[24px]">Background</p>
          <button
            onClick={handleSave}
            disabled={activeBg == -1}
            className={`${activeBg == -1 && "dark:text-[#6f726f] text-[#b9afaf]"} dark:bg-[#3D3D3D] p-[12px_24px_12px_24px] bg-[#efefef] rounded-[48px]`}
          >
            Save
          </button>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-2 gap-6 w-full mb-[24px]">
          <div className="rounded-[16px] h-[300px]">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-[300px] border-2 border-[#3D3D3D] border-dashed rounded-lg cursor-pointer bg-[#efefef] dark:bg-[#18181B] hover:bg-gray-100 dark:hover:bg-[#161618]"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon size={40} color="#7F7F7F" />
                  <p className="mb-2 text-sm text-[#848585] mt-1">
                    <span>Upload Background Image</span>
                  </p>
                </div>
                <input accept="image/*" onChange={(e) => handleFileChange(e)} id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div
            // style={{ background: `url(/home-background.png)` }}
            className={`${activeBg == 11 ? "border-[2px]" : "border-dashed border-[2px] border-[#3D3D3D]"} rounded-[16px] cursor-pointer h-[300px]`}
          />
        </div>
        <div className="grid grid-cols-4 gap-6 w-full">
          {Array.from({ length: 8 })?.map((_, idx) => (
            <div
              onClick={() => handleChangeBg(idx)}
              style={{ background: `url(/backgroundImages/${idx + 1}.jpg)` }}
              key={idx}
              className={`${activeBg == idx && "border-[2px]"} h-[122px] cursor-pointer w-full rounded-[16px]`}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
