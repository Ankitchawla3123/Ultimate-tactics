import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  CircleSmall,
  LineSquiggle,
  Minus,
  Move,
  Tally1,
} from "lucide-react";
import React from "react";
import { DropMenu } from "../../index";
import PlayerOptions from "./PlayerOptions";
import { useDispatch, useSelector } from "react-redux";
import { setmode } from "../../../store/boardslice";
import { setdrawtype } from "../../../store/moveableslice";
import { DropMenu2 } from "./DropMenu2";

function FullMenu({ addplayer }) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.board.mode);

  const handleModeChange = (value) => {
    dispatch(setmode(value));
  };

  const handleElementChange = (value) => {
    dispatch(setdrawtype(value));
  };

  return (
    <div className="w-full flex h-10">
      <PlayerOptions addplayer={addplayer} />

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

      <DropMenu
        placeholder={"tool"}
        label={"Element"}
        options={[
          {
            value: "line",
            placeholder: (
              <span className="flex select-none items-center gap-1">
                <Move className="w-1/4 h-1/4" />
                Line
              </span>
            ),
          },
          {
            value: "polygon",
            placeholder: (
              <span className="flex select-none items-center gap-1">
                <LineSquiggle className="w-1/4 h-1/4" />
                Polygon
              </span>
            ),
          },
        ]}
        Default={"line"}
        onChange={handleElementChange}
      />

      <DropMenu2
        placeholder={"line-features"}
        label={"Ends"}
        options={[
          {
            value: "left-arrow",
            placeholder: <ArrowLeftFromLine />,
          },
          {
            value: "left-end",
            placeholder: (
              <span className=" ">
                <CircleSmall className="w-2/3" />
              </span>
            ),
          },
        ]}
        Default={"left-end"}
        onChange={handleElementChange}
      />

      <DropMenu2
        placeholder={"line-features"}
        label={"ends"}
        options={[
          {
            value: "right-arrow",
            placeholder: <ArrowRightFromLine />,
          },
          {
            value: "right-end",
            placeholder: (
              <span className=" ">
                <CircleSmall className="w-2/3" />
              </span>
            ),
          },
        ]}
        Default={"right-end"}
        onChange={handleElementChange}
      />
    </div>
  );
}

export default FullMenu;
