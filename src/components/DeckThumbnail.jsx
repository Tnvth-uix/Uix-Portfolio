"use client";

export default function DeckThumbnail({ title, index }) {
  const colors = [
    ["#6366f1", "#8b5cf6"],
    ["#3b82f6", "#06b6d4"],
    ["#ec4899", "#f97316"],
    ["#8b5cf6", "#3b82f6"],
    ["#06b6d4", "#10b981"],
    ["#f97316", "#eab308"],
    ["#ef4444", "#f97316"],
    ["#3b82f6", "#6366f1"],
  ];

  const [color1, color2] = colors[index % colors.length];

  return (
    <svg
      className="deck-thumbnail"
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} stopOpacity="1" />
          <stop offset="100%" stopColor={color2} stopOpacity="1" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#grad-${index})`} />

      <circle cx="50" cy="50" r="40" fill="rgba(255, 255, 255, 0.1)" />
      <circle cx="350" cy="250" r="60" fill="rgba(255, 255, 255, 0.08)" />
      <circle cx="380" cy="30" r="30" fill="rgba(255, 255, 255, 0.06)" />

      <text
        x="200"
        y="160"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="32"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.5px"
      >
        {title.split(" ").slice(0, 3).join(" ")}
      </text>

      <text
        x="200"
        y="200"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(255, 255, 255, 0.7)"
        fontSize="14"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Business Case
      </text>
    </svg>
  );
}
