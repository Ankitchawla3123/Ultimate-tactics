import React, { useRef, useState } from "react";
import { getPointerPosition } from "../../utils/getPointerPosition";

function BoardStruct() {
  const boardref = useRef(null);
  const [line, setline] = useState("");
  const [tempPoint, settempPoint] = useState("");

  const drawline = (e) => {
    const { x, y } = getPointerPosition(e, boardref);
    if (line == "") {
      setline({ x1: x, y1: y });
    } else {
      setline((prev) => ({ ...prev, x2: x, y2: y }));
    }
    console.log(line);
  };

  const Temppointset = (e) => {
    if (line  && e.buttons ==1 ) {
      const {x,y} = getPointerPosition(e,boardref);
      settempPoint({x:x,y:y})
    }

  };

  return (
    <div className="w-full h-full">
      <svg
        ref={boardref}
        width="100%"
        height="100%"
        onClick={(e) => {
          drawline(e);
        }}
        onMouseMove={(e)=>Temppointset(e)}
      >
        {line && (
          <line
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${tempPoint.x}%`}
            y2={`${tempPoint.y}%`}
            style={{ cursor: "pointer" }}
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
}

export default BoardStruct;
