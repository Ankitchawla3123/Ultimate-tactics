import React, { useState } from "react";
import chroma from "chroma-js";

function PlayerOptions() {
  const [PlayerOptions, setPlayerOptions] = useState([
    { number: 1, color: "#8B0000" },
    { number: 1, color: "#FFD700" },
    { number: 1, color: "#8A2BE2" },
    { number: 1, color: "#32CD32" },
    { number: 1, color: "#0000FF" },
    { number: 1, color: "#FF4500" },
    { number: 1, color: "#00CED1" },
    { number: 1, color: "#FFFFFF" },
    { number: 1, color: "#000000" },
  ]);

  const getTextColor = (color) => {
    const luminance = chroma(color).luminance();
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  const count = PlayerOptions.length;
  const diameterPercent = 100 / count; 
  const radiusPercent = diameterPercent / 2;

  return (
    <div className="  w-5/12 h-full flex p-0 m-0">
      <svg className="w-full h-full"   >
        {PlayerOptions.map((option, index) => {
          const textColor = getTextColor(option.color);
          const cx = (index + 0.5) * diameterPercent;

          return (
            <g key={index}>
              <circle
                cx={`${cx}%`}
                cy="50%"
                r={`${radiusPercent}%`}
                fill={option.color}
                stroke="black"
                strokeWidth="2%"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default PlayerOptions;
