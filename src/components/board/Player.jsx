import React from "react";
import { getNumberColor, getOuterRingColor } from "../../utils/getColor";
import { ItemsContextMenu } from "../index";

function Player({
  player,
  DragType,
  index,
  setselected,
  UpdatePlayer,
  DeletePlayer,
  playerNumberFontSize,
  aspect,
}) {
  const radius = 1.8;

  const Update = (data) => {
    UpdatePlayer(data, index);
  };

  const Delete = () => {
    DeletePlayer(index);
  };

  return (
    <ItemsContextMenu Item={player} Update={Update} Delete={Delete}>
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
        onTouchStart={(e) => {
          setselected(true);
          DragType(e, index, "Player");
        }}
        style={{ cursor: "pointer" }}
      >
        <circle
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
          fontSize={playerNumberFontSize}
        >
          {player.number}
        </text>
        <text
          className="font-bold select-none"
          x={`${player.x}%`}
          y={`${player.y}%`}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#242124"
          fontSize={playerNumberFontSize}
          dy={aspect == "16 / 10" ? "-4.3%" : "-2.6%"}
        >
          {player.name}
        </text>
      </g>
    </ItemsContextMenu>
  );
}

export default Player;
