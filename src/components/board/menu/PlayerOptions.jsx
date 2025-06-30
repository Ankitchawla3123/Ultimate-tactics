import React, { useState, useRef } from "react";
import { getNumberColor, getOuterRingColor } from "../../../utils/getColor";

function PlayerOptions() {
  const [PlayerOptions] = useState([
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

  const ghostRef = useRef(null);
  const count = PlayerOptions.length;
  const diameterPercent = 100 / count;
  const radiusPercent = diameterPercent / 2;
  const fontSizeVW = radiusPercent * 0.18;

  const handleTouchStart = (e, option) => {
    const touch = e.touches[0];
    createGhost(option, touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    moveGhost(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    removeGhost();
  };

  const createGhost = (option, x, y) => {
    removeGhost(); 

    const ghost = document.createElement("div");
    ghost.style.position = "fixed";
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
    ghost.style.transform = "translate(-50%, -50%)";
    ghost.style.width = "4vw"; 
    ghost.style.height = "4vw";
    ghost.style.borderRadius = "50%";
    ghost.style.backgroundColor = option.color;
    ghost.style.border = `0.3vw solid ${getOuterRingColor(option.color)}`;
    ghost.style.opacity = "0.5";
    ghost.style.zIndex = "9999";
    ghost.style.display = "flex";
    ghost.style.alignItems = "center";
    ghost.style.justifyContent = "center";
    ghost.style.fontWeight = "bold";
    ghost.style.color = getNumberColor(option.color);
    ghost.style.fontSize = "2.5vw";
    ghost.style.pointerEvents = "none";
    ghost.textContent = option.number;

    document.body.appendChild(ghost);
    ghostRef.current = ghost;
  };

  const moveGhost = (x, y) => {
    const ghost = ghostRef.current;
    if (ghost) {
      ghost.style.left = `${x}px`;
      ghost.style.top = `${y}px`;
    }
  };

  const removeGhost = () => {
    const ghost = ghostRef.current;
    if (ghost) {
      ghost.remove();
      ghostRef.current = null;
    }
  };

  return (
    <div
      className="w-5/12 h-full flex p-0 m-0"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <svg className="w-full h-full">
        {PlayerOptions.map((option, index) => {
          const textColor = getNumberColor(option.color);
          const cx = (index + 0.5) * diameterPercent;

          return (
            <g
              key={index}
              onTouchStart={(e) => handleTouchStart(e, option)}
            >
              <circle
                cx={`${cx}%`}
                cy="50%"
                r={`${radiusPercent}%`}
                fill={option.color}
                stroke={getOuterRingColor(option.color)}
                strokeWidth="1.5%"
              />
              <text
                className="select-none"
                x={`${cx}%`}
                y="51%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill={textColor}
                fontSize={`${fontSizeVW}vw`}
                fontWeight="bold"
              >
                {option.number}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default PlayerOptions;
