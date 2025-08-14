import React, { useState, useRef, useEffect } from "react";
import {
  FaGlobeAmericas,
  FaStar,
  FaQuestionCircle,
  FaRocket,
  FaRegEye,
} from "react-icons/fa";
import "./featureSection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    bold: "3D Interactive Solar System Exploration",
    desc: "Move, zoom, and rotate realistic 3D models of planets, the Sun, and moons. Explore like you are in space!",
    icon: FaGlobeAmericas,
  },
  {
    bold: "Accurate and Rich Astronomy Knowledge",
    desc: "Discover facts, images, and fascinating stories for every planet, moon, and cosmic phenomenon.",
    icon: FaStar,
  },
  {
    bold: "Gamified Quizzes & Knowledge Challenges",
    desc: "Test your astronomy knowledge with quizzes—earn badges and climb the leaderboard with every correct answer!",
    icon: FaQuestionCircle,
  },
  {
    bold: "Astronomical Event Calendar",
    desc: "Never miss an eclipse, meteor shower, or planetary alignment. Get timely reminders for upcoming space events.",
    icon: FaRegEye,
  },
  {
    bold: "Multimedia Resources & Guided Learning",
    desc: "Enjoy NASA videos, real space photos, interactive guides, and mini-games for fun, accessible learning.",
    icon: FaRocket,
  },
];

const featureExamples = [
  {
    title: "Stunning 3D Models",
    img: "/images/feature-3d-explore.png",
    desc: "Rotate, zoom, and interact with planets and moons in a fully immersive 3D environment.",
  },
  {
    title: "Verified Space Facts",
    img: "/images/feature-planet-info.png",
    desc: "Learn about each planet's position, structure, atmosphere, temperature, and more, based on real NASA data.",
  },
  {
    title: "Astronomy Quizzes & Badges",
    img: "/images/feature-quiz.png",
    desc: "Challenge yourself with quizzes and unlock achievements as you master the solar system.",
  },
  {
    title: "Event Calendar",
    img: "/images/feature-event-calendar.png",
    desc: "See upcoming celestial events and plan your skywatching adventures.",
  },
  {
    title: "Space Media Library",
    img: "/images/feature-multimedia.png",
    desc: "Watch videos, view real telescope images, and explore interactive tutorials—all in one place.",
  },
];

export default function FeatureSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemRefs = useRef([]);
  const iconRefs = useRef([]);
  const descRefs = useRef([]);
  const cardRef = useRef(null);

  // GSAP scroll-trigger animation khi vào trang
  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
    if (itemRefs.current.length > 0) {
      gsap.fromTo(
        itemRefs.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  // Animate desc: fade-in + bay lên mỗi lần click chọn mục
  useEffect(() => {
    descRefs.current.forEach((el, idx) => {
      if (el) {
        if (idx === selectedIndex) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
        } else {
          gsap.set(el, { opacity: 0, y: 20 });
        }
      }
    });
  }, [selectedIndex]);

  // Icon hiệu ứng xuất hiện + xoay
  useEffect(() => {
    features.forEach((_, i) => {
      if (iconRefs.current[i]) {
        if (hoveredIndex === i || selectedIndex === i) {
          gsap.to(iconRefs.current[i], {
            opacity: 1,
            scale: 1,
            rotate: 360,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          gsap.to(iconRefs.current[i], {
            opacity: 0,
            scale: 0.7,
            rotate: 0,
            duration: 0.35,
            ease: "power2.inOut",
          });
        }
      }
    });
  }, [hoveredIndex, selectedIndex]);

  // Animate card bên phải (feature-example-box) khi selectedIndex thay đổi
  useEffect(() => {
    if (cardRef.current && selectedIndex !== null) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [selectedIndex]);

  return (
    <section className="feature-section-bg feature-section-container" ref={sectionRef}>
      {/* Left - Feature List */}
      <div className="flex-1 max-w-3xl pl-0 md:pl-24">
        <h2
          className="feature-section-title md:text-6xl text-black"
          ref={headingRef}
        >
          Solar System Explorer — Discover Space Like Never Before!
        </h2>
        <ul className="feature-list">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <li
                key={i}
                ref={el => (itemRefs.current[i] = el)}
                className={`feature-list-item${selectedIndex === i ? " selected" : ""}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(i)}
              >
                <div className="feature-icon text-black">
                  <span
                    ref={el => (iconRefs.current[i] = el)}
                    style={{
                      display: "inline-block",
                      opacity: 0,
                      scale: 0.7,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </span>
                </div>
                <div>
                  <span className="feature-bold text-black">{f.bold}</span>
                  {selectedIndex === i && (
                    <span
                      className="feature-desc text-black/80"
                      ref={el => (descRefs.current[i] = el)}
                    >
                      {f.desc}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Right - Demo illustration for selected feature */}
      <div className="flex-1 w-full flex flex-col gap-6 max-w-xl items-center">
        {selectedIndex === null ? (
          <div className="feature-section-empty">
            <span>Select a feature on the left to see details and illustrations!</span>
          </div>
        ) : (
          <div ref={cardRef} className="feature-example-box">
            {featureExamples[selectedIndex].img && (
              <img
                src={featureExamples[selectedIndex].img}
                alt={featureExamples[selectedIndex].title}
                className="feature-example-img"
                onError={e => (e.target.style.display = 'none')}
              />
            )}
            <div className="feature-example-title text-black/80">
              {featureExamples[selectedIndex].title}
            </div>
            <div className="feature-example-desc">
              {featureExamples[selectedIndex].desc}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
