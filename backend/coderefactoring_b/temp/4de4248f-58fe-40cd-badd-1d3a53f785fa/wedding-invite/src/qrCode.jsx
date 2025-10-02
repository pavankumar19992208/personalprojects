import React, { useRef } from "react";
import { QRCode } from "qrcode.react";
import { toPng } from "html-to-image";

const WeddingQRCode = ({ url, bride, groom }) => {
  const ref = useRef(null);

  const downloadQR = () => {
    if (ref.current === null) return;
    toPng(ref.current, { width: 1000, height: 1200, quality: 1 }).then(
      (dataUrl) => {
        const link = document.createElement("a");
        link.download = "wedding-qr.png";
        link.href = dataUrl;
        link.click();
      }
    );
  };

  return (
    <div
      ref={ref}
      style={{
        background: "linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)",
        borderRadius: 32,
        padding: 40,
        width: 400,
        textAlign: "center",
        border: "6px solid #e75480",
        boxShadow: "0 8px 32px rgba(231,84,128,0.2)",
        position: "relative",
      }}
    >
      <h2 style={{ color: "#e75480", fontFamily: "cursive", marginBottom: 8 }}>
        💍 {bride} & {groom}
      </h2>
      <div style={{ margin: "24px 0" }}>
        <QRCode
          value={url}
          size={320}
          bgColor="#fff"
          fgColor="#e75480"
          level="H"
          includeMargin={true}
          imageSettings={{
            src: "/wedding-rings.png", // optional: add a small icon in the center
            height: 48,
            width: 48,
            excavate: true,
          }}
        />
      </div>
      <div style={{ fontFamily: "serif", color: "#b03060", fontSize: 18 }}>
        Scan to view our wedding invite!
      </div>
      {/* Simple floral decorations */}
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 24,
          fontSize: 32,
        }}
      >
        🌸
      </div>
      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: 24,
          fontSize: 32,
        }}
      >
        🌺
      </div>
    </div>
  );
};

export default WeddingQRCode;
