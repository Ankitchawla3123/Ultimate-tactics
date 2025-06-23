import { useEffect, useState } from "react";
import { getPointerPosition } from "../utils/getPointerPosition";
import { useDispatch, useSelector } from "react-redux";
import { draggingoff, draggingon } from "../store/moveableslice";
import { useDrawline } from "./useDrawline";

export const useDrag = ( boardref) => {
  const [start, setstart] = useState(null);
  const [SelectedElement, setSelectedElement] = useState(null);
  const dispatch = useDispatch()

  const DragType = (e, i, element) => {
    dispatch(draggingon())
    const { x, y } = getPointerPosition(e, boardref);
    e.stopPropagation();
    setSelectedElement({
      element: element,
      index: i,
    });
    setstart({
      x: x,
      y: y,
    });
  };

  const Dragline = (e) => {
    if (e.buttons !== 1) {
      return;
    }
    if (SelectedElement != null) {
      if (e.buttons == 1) {
        const { x, y } = getPointerPosition(e, boardref);
        const deltaX = x - start.x;
        const deltaY = y - start.y;
        setlines((lines) =>
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

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseUp = () => {
    setstart(null);
    setSelectedElement(null);
    dispatch(draggingoff())
    
  };

  return { Dragline, DragType };
};
