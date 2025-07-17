import React, { useRef } from "react";
import {
  FootballField,
  BoardStruct,
  FormationDialogue,
  FullMenu,
  ClearMenu,
} from "../index";
import { useDispatch } from "react-redux";
import { usePlayer } from "../../hooks/usePlayer";
import { useFormation } from "../../hooks/useFormation";
import { setclearval, setmenutoggle } from "../../store/boardslice";
import { useResponsiveSize } from "../../hooks/useResponsiveSize"; // new hook

function Board() {
  const dispatch = useDispatch();
  const ref = useRef();
  const boardref = useRef(null);

  const { players, setplayers, addplayer, UpdatePlayer, DeletePlayer } =
    usePlayer(boardref);
  const { setformation } = useFormation(setplayers);

  const { heightVh, aspect, playerNumberFontSize } = useResponsiveSize();

  const [aspectWidth, aspectHeight] = aspect.split(" / ").map(Number);
  const calculatedWidthVh = heightVh * (aspectWidth / aspectHeight);

  const boardStyle = {
    width: "auto",
    height: `${heightVh}vh`,
    position: "relative",
    aspectRatio: aspect,
    backgroundColor: "#016B19",
  };

  const options = [
    { value: "lines", placeholder: "Lines", variant: "ghost" },
    { value: "polygons", placeholder: "Polygons", variant: "ghost" },
    { value: "players", placeholder: "Players", variant: "ghost" },
    { value: "all", placeholder: "Clear All", variant: "destructive" },
  ];

  const handleClear = (value) => dispatch(setclearval(value));

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ maxWidth: `${calculatedWidthVh}vh` }}
    >
      <div
        ref={ref}
        style={boardStyle}
        className="flex justify-center items-center"
      >
        <div className="relative w-85per z-10 border-2 border-green-950 border-opacity-90">
          <FootballField horizontal={aspect === "10 / 16" ? false : true} />
        </div>
        <div className="z-20 w-full h-full absolute">
          <BoardStruct
            boardref={boardref}
            players={players}
            setplayers={setplayers}
            UpdatePlayer={UpdatePlayer}
            DeletePlayer={DeletePlayer}
            playerNumberFontSize={playerNumberFontSize}
            aspect={aspect}
          />
        </div>
      </div>

      <div
        onMouseDown={() => dispatch(setmenutoggle())}
        onTouchStart={() => dispatch(setmenutoggle())}
        className="w-full z-20 self-center"
      >
        <FullMenu
          addplayer={addplayer}
          playerNumberFontSize={playerNumberFontSize}
        />
        {/* <FormationDialogue setformation={setformation} /> */}
        {/* <ClearMenu options={options} onChange={handleClear} /> */}
      </div>
    </div>
  );
}

export default Board;
