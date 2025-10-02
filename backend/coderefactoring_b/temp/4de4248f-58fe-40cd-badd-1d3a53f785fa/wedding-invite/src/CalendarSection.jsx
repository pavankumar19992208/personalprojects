import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import calendarAnim from "./assets/ca.lottie";
import { useNavigate } from "react-router-dom";

export default function CalendarSection() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32,
      }}
    >
      <div
        style={{ marginRight: 16, cursor: "pointer" }}
        onClick={() => navigate("/details")}
      >
        <DotLottiePlayer
          src={calendarAnim}
          autoplay
          loop
          style={{ width: 64, height: 64 }}
        />
      </div>
      <div
        style={{
          fontSize: 20,
          color: "#b03060",
          fontFamily: "Caveat, cursive",
          fontWeight: "bold",
          background: "rgba(255,255,255,0.7)",
          borderRadius: 12,
          padding: "8px 20px",
          boxShadow: "0 2px 8px #e7548033",
        }}
      >
        Check Date & Venue{" "}
        <span style={{ fontSize: 24, verticalAlign: "middle" }}>→</span>
      </div>
    </div>
  );
}
