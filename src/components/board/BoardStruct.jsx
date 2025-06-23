import React, { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../../utils/getPointerPosition";
import { useDrawline } from "../../hooks/useDrawline";
import { useDrag } from "../../hooks/useDrag";

function BoardStruct() {
  const boardref = useRef(null);
  const [isDrawn, setisDrawn] = useState(false);
  const { line, drawline, lines, setlines } = useDrawline(boardref);

  const { DragType, Dragline } = useDrag(setlines, boardref);

  const mouseMoveHandler = (e) => {
    drawline(e);
    Dragline(e);
  };

  return (
    <div className="w-full h-full">
      <svg
        ref={boardref}
        width="100%"
        height="100%"
        onMouseMove={(e) => mouseMoveHandler(e)}
      >
        {line && (
          <line
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            style={{ cursor: "pointer" }}
            stroke="black"
            strokeWidth="0.5%"
            strokeLinecap="round"
          />
        )}
        {lines.map((line, i) => (
          <line
            key={i}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            style={{ cursor: "pointer" }}
            stroke="black"
            strokeWidth="0.5%"
            strokeLinecap="round"
            onMouseDown={(e) => DragType(e, i, "Line")}
          />
        ))}
      </svg>
    </div>
  );
}

export default BoardStruct;
