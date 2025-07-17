import React, { useRef, useEffect } from "react";
import { getNumberColor, getOuterRingColor } from "../../../utils/getColor";
import { useDispatch, useSelector } from "react-redux";
import {
  addselectedplayer,
  plusone,
  resetselectedplayer,
} from "../../../store/playerslice";

function PlayerOptions({ addplayer, playerNumberFontSize }) {
  const PlayerOptions = useSelector((state) => state.player.PlayerOptions);
  const selectedplayer = useSelector((state) => state.player.selectedplayer);
  const aspect = useSelector((state) => state.board.aspect); // 👈 added aspect
  const isPortrait = aspect === "10 / 16";

  const selectedPlayerRef = useRef(selectedplayer);
  const indexRef = useRef(null);
  const dispatch = useDispatch();
  const ghostRef = useRef(null);
  const touchInProgress = useRef(false);
  const count = PlayerOptions.length;
  const diameterPercent = 100 / count;
  const radiusPercent = diameterPercent / 2;

  useEffect(() => {
    selectedPlayerRef.current = selectedplayer;
  }, [selectedplayer]);

  useEffect(() => {
    window.addEventListener("mousemove", handleTouchMove);
    window.addEventListener("mouseup", handleTouchEnd);
    return () => {
      window.removeEventListener("mousemove", handleTouchMove);
      window.removeEventListener("mouseup", handleTouchEnd);
    };
  }, []);

  const handleStart = (e, option, index) => {
    if (e.type === "mousedown" && touchInProgress.current) return;
    if (e.type === "touchstart") {
      touchInProgress.current = true;
    }
    const ev = e.type.startsWith("touch") ? e.touches[0] : e;

    dispatch(
      addselectedplayer({
        ...option,
        name: "",
        metadata: { type: "player", name: "player" },
      })
    );
    indexRef.current = index;
    createGhost(option, ev.clientX, ev.clientY);
  };

  const handleTouchMove = (e) => {
    if (selectedPlayerRef.current == null) return;
    const ev = e.type.startsWith("touch") ? e.touches[0] : e;
    moveGhost(ev.clientX, ev.clientY);
  };

  const handleTouchEnd = (e) => {
    touchInProgress.current = false;
    removeGhost();
    e.stopPropagation();
    let elem;
    if (e.type.startsWith("touch")) {
      const changedTouch = e.changedTouches[0];
      elem = document.elementFromPoint(
        changedTouch.clientX,
        changedTouch.clientY
      );
    } else {
      elem = document.elementFromPoint(e.clientX, e.clientY);
    }
    const isDroppedOnBoard =
      elem?.closest?.('[data-component="Board"]') !== null;
    if (isDroppedOnBoard && selectedPlayerRef.current != null) {
      addplayer(e, selectedPlayerRef.current);
      dispatch(plusone(indexRef.current));
      indexRef.current = null;
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
    ghost.style.userSelect = "none";

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
      className={`${
        isPortrait ? "w-full self-center" : "w-5/12"
      } h-full flex p-0 m-0`}
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
              onTouchStart={(e) => handleStart(e, option, index)}
              onMouseDown={(e) => handleStart(e, option, index)}
              style={{ cursor: "pointer" }}
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
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill={textColor}
                fontSize={playerNumberFontSize + 1}
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
