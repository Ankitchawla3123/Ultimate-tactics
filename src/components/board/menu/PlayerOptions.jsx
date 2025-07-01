import React, { useState, useRef } from "react";
import { getNumberColor, getOuterRingColor } from "../../../utils/getColor";
import { useDispatch, useSelector } from "react-redux";
import {
  addselectedplayer,
  plusone,
  resetselectedplayer,
} from "../../../store/playerslice";

function PlayerOptions({ addplayer }) {
  const PlayerOptions = useSelector((state) => state.player.PlayerOptions);
  const dispatch = useDispatch();
  const [index, setindex] = useState(null);
  const selectedplayer = useSelector((state) => state.player.selectedplayer);
  const ghostRef = useRef(null);
  const count = PlayerOptions.length;
  const diameterPercent = 100 / count;
  const radiusPercent = diameterPercent / 2;
  const fontSizeVW = radiusPercent * 0.18;

  const handleTouchStart = (e, option, index) => {
    const touch = e.touches[0];
    dispatch(addselectedplayer({ ...option, name: "" }));
    setindex(index);
    createGhost(option, touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    moveGhost(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e) => {
    removeGhost();

    e.stopPropagation();
    var changedTouch = e.changedTouches[0];
    var elem = document.elementFromPoint(
      changedTouch.clientX,
      changedTouch.clientY
    );
    if (
      elem.dataset.component === "Board" &&
      Object.keys(selectedplayer).length != 0
    ) {
      addplayer(e, selectedplayer);
      dispatch(plusone(index));
      setindex(null);
    }
    dispatch(resetselectedplayer());
  };

  const createGhost = (option, x, y) => {
    removeGhost();
    const ghost = document.createElement("div");
    ghost.style.position = "fixed";
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
    ghost.style.transform = "translate(-50%, -50%)";
    ghost.style.width = "3vw";
    ghost.style.height = "3vw";
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
    ghost.style.fontSize = "1.5vw";
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
      onTouchEnd={(e) => handleTouchEnd(e)}
      onTouchCancel={handleTouchEnd}
    >
      <svg className="w-full h-full">
        {PlayerOptions.map((option, index) => {
          const textColor = getNumberColor(option.color);
          const cx = (index + 0.5) * diameterPercent;

          return (
            <g
              key={index}
              onTouchStart={(e) => handleTouchStart(e, option, index)}
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
