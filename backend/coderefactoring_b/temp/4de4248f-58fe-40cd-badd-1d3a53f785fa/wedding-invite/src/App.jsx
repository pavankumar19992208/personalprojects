import React from "react";
import WeddingHero from "./WeddingHero";
import FallingFlowers from "./FallingFlowers";
import CalendarSection from "./CalendarSection";
import { DotLottiePlayer } from "@dotlottie/react-player";
import plantflowersAnim from "./assets/pl.lottie";
import "./WeddingHero.css";

function App() {
  return (
    <div className="wedding-bg">
      <FallingFlowers />
      <WeddingHero />
      <CalendarSection />
      {/* Plant with flowers lottie fixed at bottom right */}
      <div className="plant-lottie">
        <DotLottiePlayer
          src={plantflowersAnim}
          autoplay
          loop
          style={{ width: 220, height: 220 }}
        />
      </div>
    </div>
  );
}

export default App;
