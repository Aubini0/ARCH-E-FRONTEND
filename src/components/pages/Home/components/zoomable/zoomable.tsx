import { MinusIcon, PlusIcon } from "lucide-react";
import React, { ReactNode, useEffect } from "react";
import useLocalStorage from "use-local-storage";

interface props {
  children: ReactNode;
}

const ZoomableComponent = ({ children }: props) => {
  const [zoomLevel, setZoomLevel] = useLocalStorage<number>("zoom_level", 100);
  const handleZoomIn = () => {
    setZoomLevel((prevZoom = 100) => Math.min(prevZoom + 10, 100));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom = 100) => Math.max(prevZoom - 10, 10));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && (event.key === "+" || event.key === "=")) {
      event.preventDefault();
      handleZoomIn();
    }
    if (event.ctrlKey && event.key === "-") {
      event.preventDefault();
      handleZoomOut();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div style={{zIndex: 1}} className="flex absolute bottom-3 bg-black rounded left-5 items-center">
        <button className="text-white font-bold py-2 px-2 focus:outline-none shadow-md flex items-center justify-center" onClick={handleZoomOut}>
          <MinusIcon size={15} />
        </button>

        <span className="text-white mx-2">{zoomLevel}%</span>

        <button className="text-white font-bold py-2 px-2 focus:outline-none shadow-md flex items-center justify-center" onClick={handleZoomIn}>
          <PlusIcon size={15} />
        </button>
      </div>

      <div
        style={{
          zoom: `${zoomLevel / 100}`,
          zIndex: 0,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default ZoomableComponent;
