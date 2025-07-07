import { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../utils/getPointerPosition";
import { useDispatch, useSelector } from "react-redux";
import { draggingoff, draggingon } from "../store/moveableslice";
import { useDrawline } from "./useDrawline";

export const useDrag = (
  setpolygons,
  setlines,
  setplayers,
  setselected,
  previewpolygon,
  boardref
) => {
  const [start, setstart] = useState(null);
  const [SelectedElement, setSelectedElement] = useState(null);
  const dispatch = useDispatch();
  const dragging = useSelector((state) => state.moveable.dragging);
  const dragRef = useRef(dragging);

  useEffect(() => {
    dragRef.current = dragging;
  }, [dragging]);

  useEffect(() => {
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const DragType = (e, i, element) => {
    if (previewpolygon()) {
      return;
    }
    e.stopPropagation();
    dispatch(draggingon());
    const { x, y } = getPointerPosition(e, boardref);
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
    const isTouch = e.type.startsWith("touch");
    if (!isTouch && e.buttons !== 1) return;
    if (SelectedElement == null) return;

    const { x, y } = getPointerPosition(e, boardref);
    const deltaX = x - start.x;
    const deltaY = y - start.y;
    if (SelectedElement.element === "Line") {
      setlines((lines) =>
        lines.map((lineObj, index) => {
          const line = lineObj.line;
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
                  ...lineObj,
                  line: {
                    ...line,
                    x1: line.x1 + deltaX,
                    y1: line.y1 + deltaY,
                    x2: line.x2 + deltaX,
                    y2: line.y2 + deltaY,
                  },
                }
              : lineObj;
          }
          return lineObj;
        })
      );
    } else if (SelectedElement.element === "Polygon") {
      setpolygons((prev) =>
        prev.map((polygonObj, index) => {
          if (index === SelectedElement.index) {
            const allWithinBounds = polygonObj.polygon.every(([px, py]) => {
              const newX = px + deltaX;
              const newY = py + deltaY;
              return newX >= 0 && newX <= 100 && newY >= 0 && newY <= 100;
            });

            if (allWithinBounds) {
              return {
                ...polygonObj,
                polygon: polygonObj.polygon.map(([px, py]) => [
                  px + deltaX,
                  py + deltaY,
                ]),
              };
            } else {
              return polygonObj;
            }
          }
          return polygonObj;
        })
      );
    } else if (SelectedElement.element === "Player") {
      setplayers((prev) =>
        prev.map((player, index) => {
          if (index === SelectedElement.index) {
            const isWithinBounds = x >= 0 && x <= 100 && y >= 0 && y <= 100;
            return isWithinBounds
              ? {
                  ...player,
                  x: x,
                  y: y,
                }
              : player;
          }
          return player;
        })
      );
    }

    setstart({ x, y });
  };

  const debounceTimer = useRef(null);
  const handleMouseUp = (e) => {
    setstart(null);
    setSelectedElement(null);
    setselected(false);
    if (dragRef.current == false) {
      return;
    }
    if (dragRef.current) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        dispatch(draggingoff());
      }, 0);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return { Dragline, DragType };
};
