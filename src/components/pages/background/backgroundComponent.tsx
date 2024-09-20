import React from "react";
import LazyLoad from "react-lazyload";
import Image from "next/image";
import SearchToolbar from "@/components/ui/searchbar";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { ImageIcon } from "lucide-react";
import { Spinner } from "@nextui-org/react";

interface Props {
  onClose: () => void;
  setHomePageBg?: (value: string) => void;
}
export const BackgroundComponent = ({ onClose, setHomePageBg }: Props) => {
  const UNSPLASH_ACCESS_KEY = "MKSrV9u_V2Ol2ADW0CUVYArKSTIjBRXZJWRk7-oPSfo";
  // const UNSPLASH_SECRET_KEY = "6B8yoTQ-uvy_6b_m370_g-iHj1_VdyeHLiAq_MsK6hw";
  const [activeBg, setActiveBg] = React.useState(-1);
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState("");
  const [debouncedValue] = useDebounce(searchVal, 1000);

  React.useEffect(() => {
    const handleSearch = async (value: string) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${value}&per_page=12&orientation=landscape&page=1&client_id=${UNSPLASH_ACCESS_KEY}`);
        const dataToFill = response?.data?.results?.map((item: { urls: any }) => item?.urls?.full);
        setImages(dataToFill);
      } finally {
        setLoading(false);
      }
    };
    if (debouncedValue) {
      handleSearch(debouncedValue);
    }
  }, [debouncedValue]);

  const handleChangeBg = (active: number) => {
    setActiveBg(active);
  };
  const handleSave = () => {
    if (setHomePageBg) {
      setHomePageBg(images[activeBg]);
    }
    onClose();
  };

  return (
    <main className="px-[32px] py-[24px] h-full overflow-auto">
      <section className="mb-[40px]">
        <div className="flex items-center justify-between">
          <p className="font-[500] text-[24px] text-white">Background</p>
          <button onClick={handleSave} disabled={activeBg == -1} className={`${activeBg == -1 ? "text-[#6f726f]" : "text-white"} bg-[#3D3D3D] p-[12px_24px_12px_24px] rounded-[48px]`}>
            Save
          </button>
        </div>
      </section>
      <section className="mb-20">
        <SearchToolbar onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchVal(e?.target?.value)} placeholder="Search images 'sky' " />
      </section>
      <section>
        <div className="grid grid-cols-4 gap-6 w-full">
          {!loading && images?.length ? (
            images?.map((item, idx) => (
              <LazyLoad key={idx}>
                <Image
                  width={100}
                  height={122}
                  onClick={() => handleChangeBg(idx)}
                  className={`${activeBg == idx && "border-[2px]"} h-[122px] text-white cursor-pointer w-full rounded-[16px]`}
                  src={item}
                  onLoad={()=> setLoading(false)}
                  alt={`Background image`}
                />
              </LazyLoad>
            ))
          ) : (
            <></>
          )}
        </div>
      </section>
      {(!images?.length || loading) && (
        <section className="flex justify-center flex-col items-center w-full h-[calc(100%-300px)]">
          {loading ? (
            <Spinner size="lg" />
          ) : (
            <>
              <ImageIcon size={200} color="#fff" />
              <p className="font-bold text-[20px] mt-1 text-white text-center">Choose the image for your background</p>
            </>
          )}
        </section>
      )}
    </main>
  );
};
