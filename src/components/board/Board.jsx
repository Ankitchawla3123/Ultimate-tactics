import React, { useEffect, useRef } from "react";
import {FootballField , BoardStruct} from '../index'
import { useDispatch, useSelector } from "react-redux";



function Board() {
  const isVertical = useSelector((state) => state.board.vertical); // true = portrait

  const ref=useRef();
  useEffect(() => {
  const height = window.innerWidth;
  const elementHeight = ref.current?.getBoundingClientRect().height;

  console.log("Viewport height:", height);
  console.log("Element height:", elementHeight);

  }, [])
  

  const boardStyle = {
    width: isVertical ? "80vw" : "56%",
    height: "auto",
    
    position: "relative",
    backgroundColor: "green",
    aspectRatio: isVertical ? "0.625" : "1.60", // portrait vs landscape
  };
  return (
    <div>
          <div className=" flex flex-col">
      <div ref={ref} style={boardStyle} className="  flex justify-center items-center">
        <div className=" relative w-85per h-auto bg-green z-10">
          <FootballField />
        </div>
        <div className=" w-full h-full absolute">
          <BoardStruct />
        </div>
      </div>
    </div>  
    <div>conrext menu</div>
    </div>

  );
}

export default Board;
