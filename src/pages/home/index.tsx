import Header from "@/pages/home/components/header";
import React, { useEffect, useState } from "react";
import backgroundImage from "@/assets/images/home-background.png";
import DateTimeSection from "@/pages/home/components/DateTimeSection";
import RightSection from "@/pages/home/components/RightSection";
import styles from "./home-styles.module.css";
import { HomeDock } from "./components/Dock";

const Home = () => {
  return (
    <div
      className={styles.homeMain}
    >
      <Header />
      <DateTimeSection />
      <RightSection />
      <HomeDock />
    </div>
  );
};

export default Home;
