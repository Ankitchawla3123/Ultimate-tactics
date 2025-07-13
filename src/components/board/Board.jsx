import React, { useEffect, useRef } from "react";
import {
  FootballField,
  BoardStruct,
  FormationDialogue,
  FullMenu,
} from "../index";
import { useDispatch, useSelector } from "react-redux";
import { usePlayer } from "../../hooks/usePlayer";
import { useFormation } from "../../hooks/useFormation";

function Board() {
  const isVertical = useSelector((state) => state.board.vertical); // true = portrait
  const ref = useRef();
  const boardref = useRef(null);
  const { players, setplayers, addplayer, UpdatePlayer, DeletePlayer } =
    usePlayer(boardref);

  const { setformation } = useFormation(setplayers);
  const boardStyle = {
    width: "52vw",
    height: "auto",
    position: "relative",
    aspectRatio: "16/10",
    backgroundColor: "#016B19",
  };
  return (
    <div className="w-fit items-center">
      <div className="relative flex flex-col items-center">
        <div
          ref={ref}
          style={boardStyle}
          className=" flex justify-center items-center "
        >
          <div className=" relative  w-85per  z-10  border-2 border-green-950 border-opacity-90">
            <FootballField horizontal={true} />
          </div>
          <div className="z-20 w-full h-full absolute">
            <BoardStruct
              boardref={boardref}
              players={players}
              setplayers={setplayers}
              UpdatePlayer={UpdatePlayer}
              DeletePlayer={DeletePlayer}
            />
          </div>
        </div>
        <div className="w-full z-20 self-center">
          <FullMenu addplayer={addplayer} />
          <FormationDialogue setformation={setformation} />
        </div>
      </div>
    </div>
  );
}

export default Board;
