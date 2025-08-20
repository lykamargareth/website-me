import React from "react";
import grass from "../assets/Grass.png";
import cloudsFront from "../assets/Clouds-front.png";
import cloudsMid from "../assets/Clouds-mid.png";
import cloudsBack from "../assets/Clouds-back.png";
import sky from "../assets/Background.png";
// import "./Background.css";

function Background() {
  return (
    <div className="background-container">
      <div className="background-layer sky">
        <img src={sky} alt="sky" />
        <img src={sky} alt="sky duplicate" />
      </div>
      <div className="background-layer clouds-back">
        <img src={cloudsBack} alt="clouds back" />
        <img src={cloudsBack} alt="clouds back duplicate" />
      </div>
      <div className="background-layer clouds-mid">
        <img src={cloudsMid} alt="clouds mid" />
        <img src={cloudsMid} alt="clouds mid duplicate" />
      </div>
      <div className="background-layer clouds-front">
        <img src={cloudsFront} alt="clouds front" />
        <img src={cloudsFront} alt="clouds front duplicate" />
      </div>
      <div className="background-layer grass">
        <img src={grass} alt="grass" />
        <img src={grass} alt="grass duplicate" />
      </div>
    </div>
  );
}

export default Background;
