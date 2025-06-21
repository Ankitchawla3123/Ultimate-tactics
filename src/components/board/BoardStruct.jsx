import React, { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../../utils/getPointerPosition";

function BoardStruct() {
  const boardref = useRef(null);
  const [line, setline] = useState("");
  const lineRef = useRef(line);
  const [lines, setlines] = useState([]);
  const [isDrawn, setisDrawn] = useState(false);
  const [tempPoint, settempPoint] = useState("");

  useEffect(() => {
    lineRef.current = line;
  }, [line]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const drawline = (e) => {
    const { x, y } = getPointerPosition(e, boardref);
    if (line == "") {
      setline({ x1: x, y1: y });
    } else {
      setline((prev) => ({ ...prev, x2: x, y2: y }));
    }
  };

  const Temppointset = (e) => {
    if (e.buttons == 1) {
      setisDrawn(true);
      drawline(e);
      const { x, y } = getPointerPosition(e, boardref);
      settempPoint({ x: x, y: y });
    }
  };

  const handleMouseUp = (e) => {
    const currentLine = lineRef.current;
    if (currentLine !== "") {
      setlines((prev) => [...prev, currentLine]);
      setline("");
    }
  };

  return (
    <div className="w-full h-full">
      <svg
        ref={boardref}
        width="100%"
        height="100%"
        onMouseMove={(e) => Temppointset(e)}
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
        {lines.map((line, i) => (
          <line
            key={i}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            style={{ cursor: "pointer" }}
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

export default BoardStruct;
