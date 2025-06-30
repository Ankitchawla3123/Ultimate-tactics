import React from "react";

function Player({ Player }) {
  const radius = 1.9;
  const fontSizeVW = radius * 0.46;

  return (
    <g>
      <circle
        className="fill-red-700 stroke-red-950"
        r={`${radius}%`}
        strokeWidth="0.7%"
        cx="50%"
        cy="50%"
      />
      <text
        className="font-bold select-none"
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={`${fontSizeVW}vw`}
      >
        10
      </text>
    </g>
  );
}

export default Player;
