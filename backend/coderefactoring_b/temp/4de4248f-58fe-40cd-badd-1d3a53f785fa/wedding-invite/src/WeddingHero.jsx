import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import bridegroomAnim from "./assets/gr.lottie";
import plantflowersAnim from "./assets/pl.lottie";
import "./WeddingHero.css";

export default function WeddingHero() {
  return (
    <div className="wedding-hero-container">
      {/* Title and Diya */}
      <div className="wedding-title-row">
        <span className="wedding-symbol" title="Blessings">
          🪔
        </span>
        <span className="wedding-title">Digital Invitation</span>
      </div>
      {/* Main bride & groom lottie */}
      <div className="hero-lottie">
        <DotLottiePlayer
          src={bridegroomAnim}
          autoplay
          style={{ width: 320, height: 320 }}
        />
      </div>
      {/* Diagonal glowing names, grouped closer */}
      <div className="hero-names">
        <div className="name-row">
          <span className="caption">chi.</span>
          <span className="name main-name">Raju</span>
        </div>
        <div className="weds">weds</div>
        <div className="name-row">
          <span className="caption">chi.la.sow.</span>
          <span className="name main-name">Jahnavi</span>
        </div>
      </div>
      {/* Plant with flowers lottie, moved up and left */}
    </div>
  );
}
