import { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../utils/getPointerPosition";
import { useSelector } from "react-redux";

export const useDrawline = (boardref) => {
  const drawtype = useSelector((state) => state.moveable.drawtype);
  const [previewline, setline] = useState(null);
  const [lines, setlines] = useState([]);
  const lineRef = useRef(previewline);
  const dragging = useSelector((state) => state.moveable.dragging);
  const [previewpolygon, setpolypoints] = useState([]);
  const [polygons, setplygons] = useState([]);
  const typeRef = useRef(drawtype);

  useEffect(() => {
    lineRef.current = previewline;
  }, [previewline]);
  useEffect(() => {
    typeRef.current = drawtype;
  }, [drawtype]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    boardref.current.addEventListener("click", handleclick);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      boardref.current.removeEventListener("click", handleclick);
    };
  }, []);

  const drawline = (e) => {
    if (dragging) {
      return;
    }

    const { x, y } = getPointerPosition(e, boardref);
    if (drawtype === "line") {
      if (e.buttons !== 1) {
        return;
      }
      if (previewline == null) {
        setline({ x1: x, y1: y, x2: x, y2: y });
      } else {
        setline((prev) => ({ ...prev, x2: x, y2: y }));
      }
    } else if (drawtype === "polygon") {
      if (previewpolygon == []) {
        return;
      } else {
      }
    }
  };

  const cleanline = () => {
    setline(null);
  };

  const handleclick = (e) => {
    if (typeRef.current !== "polygon" || dragging) {
      return;
    }
    const { x, y } = getPointerPosition(e, boardref);
    setpolypoints(prev=> [...prev, [x,y]])
    
  };

  const handleMouseUp = (e) => {
    const currentLine = lineRef.current;
    if (!currentLine) return;

    setlines((prev) => [...prev, currentLine]);
    cleanline();
  };

  return { previewline, drawline, lines, setlines };
};
