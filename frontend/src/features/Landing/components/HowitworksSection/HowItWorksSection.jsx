import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const steps = [
  {
    img: "/images/how-1.png",
    bold: "Sign Up Easily.",
    desc: "Create your free account with Google or Facebook to start exploring instantly.",
    link: "#",
    linkText: "Learn about signing up",
  },
  {
    img: "/images/how-2.png",
    bold: "Learn About the Solar System.",
    desc: "Discover fascinating facts and stories about planets, moons, and cosmic events, all verified by NASA.",
    link: "#",
    linkText: "Learn about planets",
  },
  {
    img: "/images/how-3.png",
    bold: "Explore in 3D.",
    desc: "Interact with realistic 3D models of the solar system, zoom in and out, rotate and explore from every angle.",
    link: "#",
    linkText: "See 3D features",
  },
  {
    img: "/images/how-4.png",
    bold: "Quiz & Track Events.",
    desc: "Test your knowledge with quizzes and follow upcoming celestial events easily.",
    link: "#",
    linkText: "Take a quiz",
  },
];

export default function HowItWorksSection() {
  const currentRef = useRef();
  const prevRef = useRef();
  const nextRef = useRef();

  return (
    <section className="w-full py-20 px-0 bg-[#f3fee6]">
      <div className="max-w-[1800px] mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-black mb-16 leading-tight px-8 md:px-0 pl-0 md:pl-24">
          How does Solar System Explorer work?
        </h2>
        {/* Carousel */}
        <div className="relative">
          {/* Số thứ tự + Nút prev/next */}
          <div className="flex items-center justify-between mb-8 px-4 md:px-0 ">
            <div className="text-2xl font-normal text-black pl-0 md:pl-24">
              <span id="swiper-current " ref={currentRef} >
                1
              </span>
              /{steps.length}
            </div>
            <div className="flex gap-6">
              <button
                ref={prevRef}
                className="swiper-button-prev-custom flex items-center justify-center text-black text-3xl select-none transition"
                style={{
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                  width: "48px",
                  height: "48px",
                  cursor: "pointer",
                  borderRadius: 0, // nếu muốn bo góc thì để 24px
                }}
                aria-label="Previous"
              >
                &larr;
              </button>
              <button
                ref={nextRef}
                className="swiper-button-next-custom flex items-center justify-center text-black text-3xl select-none transition"
                style={{
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                  width: "48px",
                  height: "48px",
                  cursor: "pointer",
                  borderRadius: 0,
                }}
                aria-label="Next"
              >
                &rarr;
              </button>
            </div>
          </div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={60}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              if (currentRef.current)
                currentRef.current.textContent = swiper.activeIndex + 1;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              900: { slidesPerView: 2 },
              1400: { slidesPerView: 3 },
            }}
            className="howitworks-swiper"
          >
            {steps.map((step, idx) => (
              <SwiperSlide key={idx}>
                {/* CARD TO */}
                <div
                  className="flex flex-col overflow-hidden border  w-full bg-white "
                  style={{
                    borderRadius: 0,
                    minWidth: 0,
                    maxWidth: "100%",
                    height: "600px", // Card rất cao, có thể tăng/giảm
                    background: "#f3fee6",
                  }}
                >
                  {/* Ảnh background thật lớn đầu card */}
                  <div
                    className="w-full"
                    style={{
                      height: 320,
                      background: step.img
                        ? `#f3fee6 url('${step.img}') center/cover no-repeat`
                        : "#f3fee6",
                    }}
                  >
                    {!step.img && (
                      <span className="text-gray-400 flex items-center justify-center h-full">
                        [Image here]
                      </span>
                    )}
                  </div>
                  {/* Nội dung card */}
                  <div className="flex flex-col flex-1 px-14 py-12">
                    <div className="mb-4">
                      <span className="font-extrabold text-xl text-black">
                        {step.bold}
                      </span>{" "}
                      <span className="text-xl text-black/80">{step.desc}</span>
                    </div>
                    {step.link && (
                      <a
                        href={step.link}
                        className="text-xl underline text-black mt-8 hover:text-blue-800 font-semibold transition"
                        tabIndex={0}
                      >
                        {step.linkText}
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style>{`
        .howitworks-swiper .swiper-slide {
          padding-bottom: 1.5rem;
        }
        @media (max-width: 900px) {
          .howitworks-swiper .swiper-slide {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
      `}</style>
    </section>
  );
}
