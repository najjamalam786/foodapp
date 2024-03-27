import React from "react";
import Loader1 from "../img/favicon1.png";
import Loader2 from "../img/favicon2.png";
import Loader3 from "../img/favicon3.png";
import Loader4 from "../img/favicon4.png";
import './Loader.css'

const Loader = () => {
  return (
    <>
    <div className="top"></div>
    <div className="main">
      <img src={Loader1} alt="" />
        <img src={Loader2} alt="" />
        <img src={Loader3} alt="" />
        <img src={Loader4} alt="" />
    </div>
    </>
  );
};

export default Loader;
