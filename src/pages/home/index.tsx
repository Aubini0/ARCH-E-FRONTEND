import Header from "@/pages/home/components/header";
import React, { useEffect, useState } from "react";
import backgroundImage from "@/assets/images/home-background.png";
import DateTimeSection from "@/pages/home/components/DateTimeSection";
import RightSection from "@/pages/home/components/RightSection";

const Home = () => {
    return (
        <div style={{backgroundColor: 'white', backgroundImage: `url(${backgroundImage.src})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundPosition: 'left top'}}>
            <Header/>
            <DateTimeSection/>
            <RightSection />
        </div>
    )
};

export default Home;
