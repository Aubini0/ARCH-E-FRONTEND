import Header from "@/pages/home/components/header";
import React from "react";
import DateTimeSection from "@/pages/home/components/DateTimeSection";
import RightSection from "@/pages/home/components/RightSection";
import styles from "./home-styles.module.css";
import { HomeDock } from "./components/Dock";
import useLocalStorage from "use-local-storage";

const Home = () => {
  const [homePageBg] = useLocalStorage("home_bg_image", "");
  const [background, setBackground] = React.useState("");

  React.useEffect(() => {
    const bg = homePageBg ? homePageBg : "/home-background.png";
    setBackground(bg);
  }, [homePageBg]);
  return (
    <div style={{ background: `url(${background})`, backgroundSize: "cover" }} className={styles.homeMain}>
      <Header />
      <DateTimeSection />
      <RightSection />
      <HomeDock />
    </div>
  );
};

export default Home;
