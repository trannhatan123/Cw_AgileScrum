export default function HeroTrustLogos() {
  const logos = [
    "/images/logo/blue_origin_black.png",
    "/images/logo/Citizen.png",
    "/images/logo/curiosity.png",
    "/images/logo/hubble.png",
    "/images/logo/lego.png",
    "/images/logo/nasa.png",
    "/images/logo/national.png",
    "/images/logo/society.png",
    "/images/logo/solarscope.png",
    "/images/logo/spaceX.png",
    "/images/logo/stell.png",
    "/images/logo/universe.png",
    "/images/logo/spaceengine.png",
  ];

  // Nhân đôi mảng để tạo hiệu ứng lặp
  const logosDouble = [...logos, ...logos];

  return (
    <div className="section-trust-logos-wrapper">
      <div className="section-trust-logos-roll">
        {logosDouble.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Brand Logo ${idx + 1}`}
            className="section-trust-logo-img"
          />
        ))}
      </div>
    </div>
  );
}
