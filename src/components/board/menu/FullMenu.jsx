import React, { useEffect, useState } from "react";
import { Hexagon, LineSquiggle, Minus, Move } from "lucide-react";
import { DropMenu, PlayerOptions, EditOption, ColorInput } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import { setdrawtype, setlinetype, setmode } from "../../../store/boardslice";
import { div } from "motion/react-client";

function FullMenu({ addplayer, playerNumberFontSize }) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.board.mode);
  const drawtype = useSelector((state) => state.board.drawtype);

  const aspect = useSelector((state) => state.board.aspect);
  console.log(aspect)
  const [isPortrait, setIsPortrait] = useState(null);

  useEffect(() => {
    if (aspect) {
      setIsPortrait(aspect === "10 / 16");
    }
  }, [aspect]);
  if (!aspect) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-500"></div>
      </div>
    );
  }
  

  const handleModeChange = (value) => {
    dispatch(setmode(value));
  };

  const handleElementChange = (value) => {
    dispatch(setdrawtype(value));
  };

  const handleLineType = (value) => {
    dispatch(setlinetype(value));
  };

  return (
    <div
      className={`w-full ${
        isPortrait
          ? "flex flex-col gap-1 h-10 md:h-10 lg:h-12 xl:h-14 2xl:h-16"
          : "flex h-10 md:h-11 lg:h-13 xl:h-15 2xl:h-18 3xl:h-20 "
      }`}
    >
      <PlayerOptions
        isPortrait={isPortrait}
        playerNumberFontSize={playerNumberFontSize}
        addplayer={addplayer}
      />
      <div
        className={`${
          isPortrait ? "flex gap-1 items-center" : "flex gap-2 items-center"
        }`}
      >
        <DropMenu
          placeholder={"Mode"}
          label={"Features"}
          options={[
            {
              value: "drag",
              placeholder: (
                <span className="flex select-none items-center gap-1">
                  <Move className="w-1/4 h-1/4" />
                  Drag
                </span>
              ),
            },
            {
              value: "draw",
              placeholder: (
                <span className="flex select-none items-center gap-1">
                  <LineSquiggle className="w-1/4 h-1/4" />
                  Draw
                </span>
              ),
            },
          ]}
          Default={"drag"}
          onChange={handleModeChange}
        />
        {mode === "draw" && (
          <DropMenu
            placeholder={"tool"}
            label={"Element"}
            options={[
              {
                value: "line",
                placeholder: (
                  <span className="flex select-none items-center gap-0.5">
                    <Minus className="w-1/2 h-1/4" />
                    Line
                  </span>
                ),
              },
              {
                value: "polygon",
                placeholder: (
                  <span className="flex select-none items-center gap-1">
                    <Hexagon className="w-1/5" />
                    Polygon
                  </span>
                ),
              },
            ]}
            Default={"line"}
            onChange={handleElementChange}
          />
        )}
        {drawtype === "line" && mode === "draw" && (
          <EditOption isPortrait={isPortrait} handleLineType={handleLineType} />
        )}
        {mode === "draw" && <ColorInput />}
      </div>
    </div>
  );
}

export default FullMenu;
