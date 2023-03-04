import React from "react";
import Navbars from "./index-sections/Navbars.js";
import Tabs from "./index-sections/Tabs.js";
import Pagination from "./index-sections/Pagination.js";
import Notifications from "./index-sections/Notifications.js";
import Typography from "./index-sections/Typography.js";
import Javascript from "./index-sections/Javascript.js";
import Carousel from "./index-sections/Carousel.js";
import NucleoIcons from "./index-sections/NucleoIcons.js";
import CompleteExamples from "./index-sections/CompleteExamples.js";
import SignUp from "./index-sections/SignUp.js";
import Examples from "./index-sections/Examples.js";
import Download from "./index-sections/Download.js";
import IndexNavbar from "./Navbars/IndexNavbar.js";
import IndexHeader from "./Headers/IndexHeader.js";
import DarkFooter from "./Footers/DarkFooter.js";
import Images from "./index-sections/Images.js";
import BasicElements from "./index-sections/BasicElements.js";
const Home = () => {
  return (
    <>
   
    <div className="wrapper">
      <IndexHeader />
      <div className="main">
        <Images />
        <BasicElements />
       
        <Tabs />
        <Pagination />
        <Notifications />
        <Typography />
        <Javascript />
        <Carousel />
        <NucleoIcons />
        <CompleteExamples />
        <SignUp />
        <Examples />
        <Download />
      </div>
      <DarkFooter />
    </div>
  </>
  );
};

export default Home;
