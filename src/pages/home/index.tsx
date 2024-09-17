import React from "react";
import styles from "./home-styles.module.css";
import useLocalStorage from "use-local-storage";
import Header from "@/components/pages/Home/components/header";
import DateTimeSection from "@/components/pages/Home/components/DateTimeSection";
import RightSection from "@/components/pages/Home/components/RightSection";
import { HomeDock } from "@/components/pages/Home/components/Dock";

const Home = () => {
  const [homePageBg, setHomePageBg] = useLocalStorage("home_bg_image", "");
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
      <HomeDock setHomePageBg={setHomePageBg} />
    </div>
  );
};

export default Home;
