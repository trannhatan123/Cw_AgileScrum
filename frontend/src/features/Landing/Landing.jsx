// src/features/Home/Home.jsx
import React from "react";
import HeroSection from "./components/HeroSection/HeroSection";
import FeatureSection from "./components/FeatureSection/FeatureSection";
import HowItWorksSection from "./components/HowitworksSection/HowItWorksSection";
import WhyChooseSection from "./components/WhyChooseSection/WhyChooseSection"
import ReviewSection from "./components/ReviewSection/ReviewSection"
import './sectionStyle.css'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection/>
      <WhyChooseSection/>
      <ReviewSection/>
    </>
  );
}
