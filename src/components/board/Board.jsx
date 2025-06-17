import React from "react";
import FootballField from "./Field";
import BoardStruct from "./BoardStruct";


function Board() {
  const viewportwidth = 56;

  const boardStyle = {
    width: "56%",
    height: "auto",
    position: "relative",
    backgroundColor: "green",
    aspectRatio: "1.60",
  };
  return (
    <div className="flex flex-col">
      <div style={boardStyle} className="flex justify-center items-center">
        <div className="relative  w-85per h-auto bg-green z-10">
          <FootballField />
        </div>
        <div className=" absolute">
          <BoardStruct />
        </div>
      </div>


    </div>
  );
}

export default Board;
