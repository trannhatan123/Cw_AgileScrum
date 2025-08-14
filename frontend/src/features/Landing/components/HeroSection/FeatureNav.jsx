const FEATURE_LIST = [
  { label: "Explore Planets", key: "planets", hoverClass: "planets" },
  { label: "3D Visualization", key: "3d", hoverClass: "threeD" },
  { label: "Astronomy Knowledge", key: "astronomy", hoverClass: "astronomy" },
  { label: "Fun Quiz", key: "quiz", hoverClass: "quiz" },
  { label: "Dynamic Solar System", key: "solar-dynamic", hoverClass: "solar" },
];

export default function FeatureNav({ onSelect, activeKey }) {
  return (
    <div className="section-feature-nav flex-wrap flex-row sm:flex-wrap md:flex-nowrap justify-center items-center gap-2 sm:gap-3 md:gap-6 px-2 sm:px-0">
      {FEATURE_LIST.map((f) => (
        <button
          key={f.key}
          className={[
            "section-feature-nav-item",
            activeKey === f.key ? "active" : "",
            f.hoverClass,
            "text-base sm:text-lg md:text-xl xl:text-2xl",
            "px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4",
            "flex items-center gap-2"
          ].join(" ")}
          onClick={() => onSelect(f.key)}
          style={{ fontWeight: activeKey === f.key ? 600 : 500 }}
        >
          <span className="hidden sm:inline text-xl md:text-2xl xl:text-3xl">{f.icon}</span>
          <span className="">{f.label}</span>
        </button>
      ))}
    </div>
  );
}
