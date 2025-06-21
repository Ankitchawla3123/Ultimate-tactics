import React, { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../../utils/getPointerPosition";
import { useDrawline } from "../../hooks/useDrawline";

function BoardStruct() {
  const boardref = useRef(null);
  const [isDrawn, setisDrawn] = useState(false);
  const [SelectedElement, setSelectedElement] = useState(null);
  const { line, drawline, lines, setlines } = useDrawline(boardref);
  const [start, setstart] = useState(null);

  const [Draging, setDraging] = useState(false);

  const mouseMoveHandler = (e) => {
    if (!Draging) {
      drawline(e);
    }
    if (SelectedElement != null) {
      if (e.buttons == 1) {
        const { x, y } = getPointerPosition(e, boardref);
        const deltaX = x - start.x;
        const deltaY = y - start.y;
        console.log(SelectedElement)
        setlines(
          lines.map((line, index) => {
            if (index === SelectedElement.index) {
              const isWithinBounds =
                line.x1 + deltaX >= 0 &&
                line.x2 + deltaX >= 0 &&
                line.x1 + deltaX <= 100 &&
                line.x2 + deltaX <= 100 &&
                line.y1 + deltaY >= 0 &&
                line.y2 + deltaY >= 0 &&
                line.y1 + deltaY <= 100 &&
                line.y2 + deltaY <= 100;

              return isWithinBounds
                ? {
                    ...line,
                    x1: line.x1 + deltaX,
                    y1: line.y1 + deltaY,
                    x2: line.x2 + deltaX,
                    y2: line.y2 + deltaY,
                  }
                : line;
            }
            return line;
          })
        );
        setstart({ x, y });
      }
    }
  };

  const dragtypeset = (e, i) => {
    const { x, y } = getPointerPosition(e, boardref);
    e.stopPropagation();
    setDraging(true);
    console.log(i)
    setSelectedElement({
      element: "line",
      index: i,
    });
    setstart({
      x: x,
      y: y,
    });
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
            onMouseDown={(e) => dragtypeset(e, i)}
          />
        ))}
      </svg>
    </div>
  );
}

export default BoardStruct;
