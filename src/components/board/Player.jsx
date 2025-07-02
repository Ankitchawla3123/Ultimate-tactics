import React from "react";
import { getNumberColor, getOuterRingColor } from "../../utils/getColor";
import ItemsContextMenu from "../ItemsContextMenu";

function Player({ player, DragType, index, setselected }) {
  const radius = 1.8;
  const fontSizeVW = radius * 0.46;

  return (
    <ItemsContextMenu>
      <g
        onDoubleClick={(e) => {
          e.stopPropagation();
          setselected(true);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setselected(true);
        }}
        onMouseDown={(e) => {
          setselected(true);
          DragType(e, index, "Player");
        }}
        style={{ cursor: "pointer" }}
      >
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
    </ItemsContextMenu>
  );
}

export default Player;
