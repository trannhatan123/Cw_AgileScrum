import React, { useState } from "react";
import HeroContent from "./HeroContent";
import Hero3DSection from "./Hero3DSection";
import FeatureNav from "./FeatureNav";
import HeroTestimonial from "./HeroTestimonial";
import HeroTrustLogos from "./HeroTrustLogos";

// Component block dùng props để tái sử dụng
function InfoBlock({ bgClass, textClass, icon, text }) {
  return (
    <div className={`min-h-[300px] ${bgClass} flex items-center justify-center rounded-xl mb-6`}>
      <h2 className={`text-2xl ${textClass}`}>{icon} {text}</h2>
    </div>
  );
}

export default function HeroSection() {
  const [activeKey, setActiveKey] = useState("planets");

  let block = null;
  switch (activeKey) {
    case "planets":
      block = <Hero3DSection />;
      break;
    case "3d":
      block = (
        <InfoBlock
          bgClass="bg-gray-100"
          textClass="text-gray-700"
          icon="🔭"
          text="3D Visualization (Demo)"
        />
      );
      break;
    case "astronomy":
      block = (
        <InfoBlock
          bgClass="bg-purple-50"
          textClass="text-[#462a73]"
          icon="🌟"
          text="Astronomy Knowledge – You’re here!"
        />
      );
      break;
    case "quiz":
      block = (
        <InfoBlock
          bgClass="bg-yellow-50"
          textClass="text-yellow-700"
          icon="🧩"
          text="Fun Quiz – You’re here!"
        />
      );
      break;
    case "solar-dynamic":
      block = (
        <InfoBlock
          bgClass="bg-teal-50"
          textClass="text-teal-700"
          icon="🪐"
          text="Dynamic Solar System – You’re here!"
        />
      );
      break;
    default:
      block = null;
  }

  return (
    <header className="section relative min-h-screen w-full overflow-x-hidden bg-white" aria-label="Hero Section">
      <HeroContent />
      {/* Nội dung chủ đề */}
      <div className="mt-6">{block}</div>
      {/* Menu chuyển đổi */}
      <div className="my-8">
        <FeatureNav onSelect={setActiveKey} activeKey={activeKey} />
      </div>
      <HeroTestimonial />
      <HeroTrustLogos />
    </header>
  );
}
