import { useWindowWidth } from "@react-hook/window-size";

const useDeviceIndicator = () => {
  const width = useWindowWidth();
  //   const height = useWindowHeight();
  const isPhone = width <= 768;
  const isLargeScreen = width >= 768;
  return { isPhone, isLargeScreen };
};

export default useDeviceIndicator;
