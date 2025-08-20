import React from "react";
import Marquee from "react-fast-marquee";

import sky from "../assets/Background.png";
import cloudsBack from "../assets/Clouds-back.png";
import cloudsMid from "../assets/Clouds-mid.png";
import cloudsFront from "../assets/Clouds-front.png";
import grass from "../assets/Grass.png";

const layers = [
  { src: sky, speed: 5, zIndex: 1, alt: "sky" },
  { src: cloudsBack, speed: 10, zIndex: 2, alt: "clouds back" },
  { src: cloudsMid, speed: 20, zIndex: 3, alt: "clouds mid" },
  { src: cloudsFront, speed: 40, zIndex: 4, alt: "clouds front" },
  { src: grass, speed: 80, zIndex: 5, alt: "grass" },
];

function Background() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      {layers.map(({ src, speed, zIndex, alt }) => (
        <Marquee
          key={alt}
          direction="left"
          speed={speed}
          gradient={false}
          pauseOnHover={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex,
          }}
        >
          <img src={src} alt={alt} style={{ height: "100vh" }} />
        </Marquee>
      ))}
    </div>
  );
}

export default Background;
