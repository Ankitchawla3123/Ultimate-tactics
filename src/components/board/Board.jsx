import React, { useEffect, useRef, useState } from "react";
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

function Board() {
  const dispatch = useDispatch();
  const ref = useRef();
  const boardref = useRef(null);

  const { players, setplayers, addplayer, UpdatePlayer, DeletePlayer } =
    usePlayer(boardref);
  const { setformation } = useFormation(setplayers);

  const [heightVh, setHeightVh] = useState(70); // initial 70vh
  const [aspect, setAspect] = useState("16 / 10");

  const updateBoardHeight = () => {
    const { innerWidth: W, innerHeight: H } = window;
    const isLandscape = W > H;
    const aspectW = isLandscape ? 16 : 10;
    const aspectH = isLandscape ? 10 : 16;

    setAspect(`${aspectW} / ${aspectH}`);

    let vh = 70;

    while (vh > 40) {
      const pxHeight = (vh / 100) * H;
      const calculatedWidth = pxHeight * (aspectW / aspectH);

      if (calculatedWidth <= W) break;
      vh -= 1;
    }

    setHeightVh(vh);
  };

  useEffect(() => {
    updateBoardHeight();
    window.addEventListener("resize", updateBoardHeight);
    return () => window.removeEventListener("resize", updateBoardHeight);
  }, []);

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
    <div className="w-fit items-center">
      <div className="relative flex flex-col items-center">
        <div
          ref={ref}
          style={boardStyle}
          className="flex justify-center items-center"
        >
          <div className="relative w-85per z-10 border-2 border-green-950 border-opacity-90">
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

        <div
          onMouseDown={() => dispatch(setmenutoggle())}
          onTouchStart={() => dispatch(setmenutoggle())}
          className="w-full z-20 self-center"
        >
          <FullMenu addplayer={addplayer} />
          <FormationDialogue setformation={setformation} />
          <ClearMenu options={options} onChange={handleClear} />
        </div>
      </div>
    </div>
  );
}

export default Board;
