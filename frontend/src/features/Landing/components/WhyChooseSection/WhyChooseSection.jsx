import { useRef, useEffect } from "react";
import { FaGlobe, FaRegSmileBeam, FaStar } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: "Global Exploration",
    desc: "Travel the solar system from any device, any place, any time – 3D, AR, and more.",
    icon: <FaGlobe className="text-indigo-600 w-8 h-8" />,
  },
  {
    title: "Fun for Everyone",
    desc: "Designed for all ages: quizzes, games, and a friendly community for learning and sharing.",
    icon: <FaRegSmileBeam className="text-pink-500 w-8 h-8" />,
  },
  {
    title: "Verified Excellence",
    desc: "All information is science-backed and double-checked, so you can trust what you discover.",
    icon: <FaStar className="text-yellow-400 w-8 h-8" />,
  },
];

export default function WhyChooseSection() {
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Timeline cho dot
    gsap.fromTo(
      dotRefs.current,
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: "back.out(1.8)",
        scrollTrigger: {
          trigger: ".whychoose-timeline",
          start: "top 80%",
        },
      }
    );
    // Timeline cho card
    gsap.fromTo(
      cardRefs.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.18,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".whychoose-timeline",
          start: "top 80%",
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <section className="py-20 bg-sky-100 flex flex-col items-center w-full">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-black mb-14">
        Why Choose Solar System Explorer?
      </h2>
      {/* Timeline */}
      <div className="w-full max-w-5xl flex flex-col items-center whychoose-timeline">
        <div className="relative w-full flex items-center" style={{ minHeight: 130 }}>
          {/* Timeline line with shadow, gradient */}
          <div
            className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-3 rounded-full z-0"
            style={{
              background:
                "linear-gradient(90deg, #a7c7ff 0%, #6ec6ff 50%, #a7c7ff 100%)",
              boxShadow: "0 4px 16px 0 rgba(0,80,180,0.12), 0 0.5px 1.5px 0 #6ec6ff",
              border: "1.5px solid #bae6fd",
            }}
          />
          {/* Timeline dots & cards */}
          <div className="flex w-full justify-between z-10">
            {reasons.map((r, idx) => (
              <div key={idx} className="flex flex-col items-center w-1/3 px-2">
                {/* Icon circle */}
                <div
                  ref={el => (dotRefs.current[idx] = el)}
                  className="bg-white shadow-lg ring-4 ring-sky-200 rounded-full flex items-center justify-center w-16 h-16 mb-4 z-20 relative"
                  style={{ opacity: 0, transform: "scale(0.6)" }}
                >
                  {r.icon}
                </div>
                {/* Card info */}
                <div
                  ref={el => (cardRefs.current[idx] = el)}
                  className="bg-white/90 shadow-lg rounded-xl px-5 py-6 mt-2 flex flex-col items-center min-w-[200px] max-w-xs"
                  style={{ opacity: 0, transform: "translateY(40px)" }}
                >
                  <div className="text-xl font-bold text-black mb-1 text-center">{r.title}</div>
                  <div className="text-base text-black text-center">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
