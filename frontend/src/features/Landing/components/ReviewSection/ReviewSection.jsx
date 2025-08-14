import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Michael Tran",
    mentions: "Physics Teacher",
    imgPath: "/images/user1.jpg",
    quote: "“This website makes my students more excited about the universe than ever!”"
  },
  {
    name: "Anna Mai",
    mentions: "Parent",
    imgPath: "/images/user2.jpg",
    quote: "“Beautiful interface and easy to use. My kid asks so many interesting questions about planets now!”"
  },
  {
    name: "Linh Ngo",
    mentions: "Astronomy Student",
    imgPath: "/images/user3.jpg",
    quote: "“The 3D Solar System is incredibly realistic and engaging!”"
  },
  {
    name: "Mr. Hung",
    mentions: "STEM Teacher",
    imgPath: "/images/user4.jpg",
    quote: "“An amazing tool for teaching the solar system. The quizzes are fun and educational.”"
  },
  {
    name: "Emily Chen",
    mentions: "High School Student",
    imgPath: "/images/user5.jpg",
    quote: "“I love exploring the planets in 3D. The quizzes help me remember everything I learn!”"
  },
  {
    name: "David Smith",
    mentions: "Science Club Leader",
    imgPath: "/images/user6.jpg",
    quote: "“Solar System Explorer is perfect for our club meetings. Everyone enjoys the interactive features.”"
  },
];

function TitleHeader({ title, sub }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-3">{title}</h2>
      <div className="text-lg text-gray-700">{sub}</div>
    </div>
  );
}

function GlowCard({ children, cardRef, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd }) {
  return (
    <div
      ref={cardRef}
      className={`
        bg-white border border-orange-200 rounded-2xl shadow-lg relative p-6 my-6
        transition-all duration-300 group overflow-hidden opacity-0 translate-y-8
      `}
      style={{ touchAction: "manipulation" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Orange glow */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-30 group-active:opacity-30 pointer-events-none transition">
        <div
          style={{
            background: "radial-gradient(circle at 50% 35%, #FDBA74cc 0%, #fff0 80%)",
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function ReviewSection() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Fade in + slide up khi vào viewport
    cardsRef.current.forEach((card, idx) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: idx * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  // GSAP hover effect
  const handleHover = (idx) => {
    const card = cardsRef.current[idx];
    if (card) {
      gsap.to(card, {
        y: -20, // "jump" lên trên 20px
        boxShadow: "0 16px 48px 0 rgba(253,186,116,0.28), 0 1.5px 4px 0 #fdba74",
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };
  const handleOut = (idx) => {
    const card = cardsRef.current[idx];
    if (card) {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 4px 16px 0 rgba(255,140,0,0.10), 0 0.5px 1.5px 0 #fdba74",
        duration: 0.35,
        ease: "power2.inOut",
      });
    }
  };

  // Touch event cho mobile
  const touchTimeout = useRef(null);
  const handleTouchStart = (idx) => {
    handleHover(idx);
    // auto out sau 500ms nếu chỉ tap nhẹ
    clearTimeout(touchTimeout.current);
    touchTimeout.current = setTimeout(() => handleOut(idx), 600);
  };
  const handleTouchEnd = (idx) => {
    handleOut(idx);
    clearTimeout(touchTimeout.current);
  };

  return (
    <section id="testimonials" className="flex-center py-24 bg-orange-100">
      <div className="w-full max-w-7xl md:px-10 px-4">
        <TitleHeader
          title="What Students & Teachers Say About Solar System Explorer"
          sub="⭐️ Real feedback from our users"
        />
        <div className="lg:columns-3 md:columns-2 columns-1 gap-6">
          {testimonials.map((t, i) => (
            <GlowCard
              key={i}
              cardRef={el => (cardsRef.current[i] = el)}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleOut(i)}
              onTouchStart={() => handleTouchStart(i)}
              onTouchEnd={() => handleTouchEnd(i)}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={t.imgPath}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover shadow border border-orange-200"
                />
                <div>
                  <div className="font-bold text-black">{t.name}</div>
                  <div className="text-gray-700 text-sm">{t.mentions}</div>
                </div>
              </div>
              <div className="italic text-black text-lg">{t.quote}</div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
