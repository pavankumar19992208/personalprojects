import React from "react";
import "./FallingFlowers.css";

const flowerEmojis = ["🌸", "🌺", "🌻", "🌼", "💐", "🌷"];

export default function FallingFlowers() {
  return (
    <div className="falling-flowers">
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className={`flower flower-${i}`}
          style={{
            fontSize: `${28 + (i % 3) * 10}px`,
            filter: "drop-shadow(0 2px 6px #e75480aa)",
          }}
        >
          {flowerEmojis[i % flowerEmojis.length]}
        </span>
      ))}
    </div>
  );
}
