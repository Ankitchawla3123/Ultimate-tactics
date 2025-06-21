import { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../utils/getPointerPosition";

export const useDrawline = (boardref) => {
  const [line, setline] = useState(null);
  const [lines, setlines] = useState([]);
  const lineRef = useRef(line);


  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    lineRef.current = line;
  }, [line]);

  const drawline = (e) => {
    if (e.buttons == 1) {
      const { x, y } = getPointerPosition(e, boardref);
      if (line == null) {
        setline({ x1: x, y1: y, x2: x, y2: y });
      } else {
        setline((prev) => ({ ...prev, x2: x, y2: y }));
      }
    }
  };

  const cleanline = () => {
    setline(null);
  };

  const handleMouseUp = (e) => {
    const currentLine = lineRef.current;
    if (!currentLine) return;

    setlines((prev) => [...prev, currentLine]);
    cleanline();
  };

  return { line, drawline, lines , setlines};
};
