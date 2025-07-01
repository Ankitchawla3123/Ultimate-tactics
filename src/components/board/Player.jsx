import React from "react";
import { getNumberColor, getOuterRingColor } from "../../utils/getColor";

function Player({ player }) {
  const radius = 1.8;
  const fontSizeVW = radius * 0.46;

  return (
    <g>
      <circle
        className=""
        fill={player.color}
        stroke={getOuterRingColor(player.color)}
        r={`${radius}%`}
        strokeWidth="0.7%"
        cx={`${player.x}%`}
        cy={`${player.y}%`}
      />
      <text
        className="font-bold select-none"
        x={`${player.x}%`}
        y={`${player.y + 0.1}%`}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={getNumberColor(player.color)}
        fontSize={`${fontSizeVW}vw`}
      >
        {player.number}
      </text>
    </g>
  );
}

export default Player;
