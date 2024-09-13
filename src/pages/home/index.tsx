import Header from "@/pages/home/components/header";
import React, { useEffect, useState } from "react";
import backgroundImage from "@/assets/images/home-background.png";
import DateTimeSection from "@/pages/home/components/DateTimeSection";

const Home = () => {
    return (
        <div style={{backgroundColor: 'white', backgroundImage: `url(${backgroundImage.src})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundPosition: 'left top'}}>
            <Header/>
            <DateTimeSection/>
        </div>
    )
};

export default Home;
