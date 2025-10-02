import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import angelAnim from "./assets/lc.lottie";
import "./FlyingAngel.css";

export default function FlyingAngel() {
  return (
    <div className="flying-angel">
      <DotLottiePlayer
        src={angelAnim}
        autoplay
        loop
        style={{ width: 80, height: 80 }}
      />
    </div>
  );
}
