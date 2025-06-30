import React, { useEffect, useRef } from "react";
import { FootballField, BoardStruct } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { DropMenu } from "./menu/DropMenu";
import FullMenu from "./menu/FullMenu";

function Board() {
  const isVertical = useSelector((state) => state.board.vertical); // true = portrait

  const ref = useRef();

  const boardStyle = {
    width: "52vw",
    height: "auto",
    position: "relative",
    backgroundColor: "green",
    aspectRatio: "1.60",
  };
  return (
    <div className="w-fit"
      onTouchEnd={(e) => {
        e.stopPropagation();
        var changedTouch = e.changedTouches[0];
        var elem = document.elementFromPoint(
          changedTouch.clientX,
          changedTouch.clientY
        );
      }}
    >
      <div className=" flex flex-col"
      style={{width:"52vw"}}
      >
        <div
          ref={ref}
          style={boardStyle}
          className=" flex justify-center items-center"
        >
          <div className=" relative w-85per h-auto bg-green z-10">
            <FootballField />
          </div>
          <div className="z-20 w-full h-full absolute">
            <BoardStruct />
          </div>
        </div>
        <div className="z-50">
          <FullMenu />
        </div>
      </div>
    </div>
  );
}

export default Board;
