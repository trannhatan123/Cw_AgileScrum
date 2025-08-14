export default function FigmaStyleCard({
  img,
  title,
  desc,
  link,
  linkText = "Learn more",
}) {
  return (
    <div
      className=" overflow-hidden flex flex-col transition  border border-[#e4d7f7] w-full"
      style={{
        borderRadius: 0,      // Không bo góc
        minWidth: 0,
        maxWidth: "100%",
        background: "#f1ffe1", // Nền giống section
      }}
    >
      {/* Ảnh lớn toàn card */}
      <div className="w-full" style={{ aspectRatio: "16/10", background: "#efe8fa" }}>
        {img ? (
          <img
            src={img}
            alt={title}
            className="object-cover w-full h-full"
            style={{ display: "block" }}
            onError={e => (e.target.style.display = "none")}
          />
        ) : (
          <span className="text-gray-400 flex items-center justify-center h-full">[Image here]</span>
        )}
      </div>
      {/* Text content */}
      <div className="flex flex-col flex-1 px-10 py-10">
        <div className="font-bold text-3xl text-black mb-3">{title}</div>
        <div className="text-black text-lg mb-4 flex-1">{desc}</div>
        {link && (
          <a
            href={link}
            className="text-base text-black underline hover:text-blue-800 font-medium transition"
            tabIndex={0}
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
}
