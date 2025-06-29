import React, { useEffect, useRef } from "react";
import { FootballField, BoardStruct } from "../index";
import { useDispatch, useSelector } from "react-redux";

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
    <div >
      <div className=" flex flex-col">
        <div
          ref={ref}
          style={boardStyle}
          className="  flex justify-center items-center"
        >
          <div className=" relative w-85per h-auto bg-green z-10">
            <FootballField />
          </div>
          <div className="z-20 w-full h-full absolute">
            <BoardStruct />
          </div>
        </div>
      </div>
      <div>conrext menu</div>
    </div>
  );
}

export default Board;
