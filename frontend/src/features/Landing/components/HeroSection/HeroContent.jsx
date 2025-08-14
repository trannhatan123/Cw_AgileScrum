import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Scene from "./HeroScene/Scene";
import SpaceCanvas from "./SpaceCanvas";

function LoginButtonHero({ children, btnRef }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={btnRef}
      type="button"
      className={`section-login-animate${hovered ? " hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="login-arrow">
        <svg
          xmlns="images/arrow-right-white.svg"
          className="w-6 h-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ verticalAlign: "middle" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
      <span className="login-label">{children}</span>
    </button>
  );
}

function ExploreButtonHero({ children, btnRef }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={btnRef}
      type="button"
      className={`section-explore-animate${hovered ? " hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="explore-arrow">
        <svg
          xmlns="/images/arrow-right.svg"
          className="w-6 h-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ verticalAlign: "middle" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
      <span className="explore-label">{children}</span>
    </button>
  );
}

export default function HeroContent() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const exploreBtnRef = useRef(null);
  const loginBtnRef = useRef(null);

  useEffect(() => {
    // Hiệu ứng title
    gsap.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    // Hiệu ứng subtitle
    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );
    // Hiệu ứng button: lần lượt từng nút, lần lượt xuất hiện sau subtitle
    gsap.fromTo(
      exploreBtnRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.7, ease: "power3.out" }
    );
    gsap.fromTo(
      loginBtnRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.9, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="section-content-container">
      <div className="flex-1 flex flex-col items-start justify-center px-6 md:px-0">
        <h1 className="section-content-title" ref={titleRef}>
          Solar System
          <br />
          Explorer
        </h1>
        <p className="section-content-desc" ref={subtitleRef}>
          Experience immersive 3D interactions and discover the planets and astronomy
          through a realistic Solar System model!
        </p>
        <div className="flex gap-3">
          <ExploreButtonHero btnRef={exploreBtnRef}>Explore now</ExploreButtonHero>
          <LoginButtonHero btnRef={loginBtnRef}>Watch introduction</LoginButtonHero>
        </div>
      </div>
      <div className="section-visual-main">
        <div className="section-visual-box">
          <SpaceCanvas />
        </div>
      </div>
    </div>
  );
}
