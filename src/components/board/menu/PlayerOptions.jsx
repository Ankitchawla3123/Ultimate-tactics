import React, { useRef, useEffect, useState } from "react";
import { getNumberColor, getOuterRingColor } from "../../../utils/getColor";
import { useDispatch, useSelector } from "react-redux";

import {
  addselectedplayer,
  plusone,
  resetselectedplayer,
} from "../../../store/playerslice";
import {
  addselectedItem,
  resetselectedItem,
} from "../../../store/extra";

function PlayerOptions({ addplayer, addextra, playerNumberFontSize }) {
  const PlayerOptions = useSelector((state) => state.player.PlayerOptions);
  const selectedplayer = useSelector((state) => state.player.selectedplayer);
  const selecteditem = useSelector((state) => state.item.selecteditem); // 👈 football/items
  const aspect = useSelector((state) => state.board.aspect);
  const isPortrait = aspect === "10 / 16";

  const selectedPlayerRef = useRef(selectedplayer);
  const selectedItemRef = useRef(selecteditem);
  const containerRef = useRef(null);
  const indexRef = useRef(null);
  const dispatch = useDispatch();
  const ghostRef = useRef(null);
  const touchInProgress = useRef(false);
  const count = PlayerOptions.length + 1; // +1 for football option

  const [radiusPercent, setRadiusPercent] = useState(0);
  const diameterPercent = 100 / count;

  // keep refs updated
  useEffect(() => {
    selectedPlayerRef.current = selectedplayer;
  }, [selectedplayer]);

  useEffect(() => {
    selectedItemRef.current = selecteditem;
  }, [selecteditem]);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const screenHeight = window.innerHeight;
        const percentage = (containerHeight / screenHeight) * 100;
        setRadiusPercent(percentage);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

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

    if (option.type === "player") {
      dispatch(
        addselectedplayer({
          ...option,
          name: "",
          metadata: { type: option.type, name: option.type },
        })
      );
    } else if (option.type === "football") {
      dispatch(
        addselectedItem({
          type: "football",
          metadata: { type: "football" },
        })
      );
    }

    indexRef.current = index;
    createGhost(option, ev.clientX, ev.clientY);
  };

  const handleTouchMove = (e) => {
    if (selectedPlayerRef.current == null && selectedItemRef.current == null) return;
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
      elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
    } else {
      elem = document.elementFromPoint(e.clientX, e.clientY);
    }

    const isDroppedOnBoard =
      elem?.closest?.('[data-component="Board"]') !== null;

    // ✅ Player drop
    if (isDroppedOnBoard && selectedPlayerRef.current != null) {
      addplayer(e, selectedPlayerRef.current);
      dispatch(plusone(indexRef.current));
      indexRef.current = null;
    }

    // ✅ Football / items drop
    if (isDroppedOnBoard && selectedItemRef.current != null) {
      addextra(e, selectedItemRef.current);
    }

    // cleanup both
    dispatch(resetselectedplayer());
    dispatch(resetselectedItem());
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
    ghost.style.backgroundColor = option.color || "white";
    ghost.style.border = option.color
      ? `0.3vw solid ${getOuterRingColor(option.color)}`
      : "0.3vw solid black";
    ghost.style.opacity = "0.5";
    ghost.style.zIndex = "9999";
    ghost.style.display = "flex";
    ghost.style.alignItems = "center";
    ghost.style.justifyContent = "center";
    ghost.style.fontWeight = "bold";
    ghost.style.color = option.color ? getNumberColor(option.color) : "black";
    ghost.style.fontSize = "1.5vw";
    ghost.style.pointerEvents = "none";
    ghost.textContent = option.number || "⚽";
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
      className={`${isPortrait ? "w-full self-center" : "w-5/12"} h-full flex`}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      ref={containerRef}
    >
      <svg className="w-full h-full">
        {/* Player options */}
        {PlayerOptions.map((option, index) => {
          const textColor = getNumberColor(option.color);
          const cx = (index + 0.5) * diameterPercent;

          return (
            <g
              key={index}
              onTouchStart={(e) =>
                handleStart(e, { ...option, type: "player" }, index)
              }
              onMouseDown={(e) =>
                handleStart(e, { ...option, type: "player" }, index)
              }
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

        {/* Football option */}
        {(() => {
          const index = PlayerOptions.length;
          const cx = (index + 0.5) * diameterPercent;
          const ballRadius = Math.max(0, radiusPercent - 1);
          const patchRadius = ballRadius * 0.4;

          return (
            <g
              key="football"
              onTouchStart={(e) =>
                handleStart(e, { type: "football" }, index)
              }
              onMouseDown={(e) =>
                handleStart(e, { type: "football" }, index)
              }
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={`${cx}%`}
                cy="50%"
                r={`${ballRadius}%`}
                fill="white"
                stroke="black"
                strokeWidth="0.5%"
              />

              <circle cx={`${cx}%`} cy="50%" r={`${patchRadius}%`} fill="black" />

              <circle
                cx={`${cx - ballRadius * 0.6}%`}
                cy="50%"
                r={`${patchRadius * 0.6}%`}
                fill="black"
              />
              <circle
                cx={`${cx + ballRadius * 0.6}%`}
                cy="50%"
                r={`${patchRadius * 0.6}%`}
                fill="black"
              />
              <circle
                cx={`${cx}%`}
                cy={`${50 - ballRadius * 0.6}%`}
                r={`${patchRadius * 0.6}%`}
                fill="black"
              />
              <circle
                cx={`${cx}%`}
                cy={`${50 + ballRadius * 0.6}%`}
                r={`${patchRadius * 0.6}%`}
                fill="black"
              />
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

export default PlayerOptions;
