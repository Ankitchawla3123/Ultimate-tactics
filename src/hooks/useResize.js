import { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../utils/getPointerPosition";
import { useDispatch, useSelector } from "react-redux";
import { draggingoff, draggingon } from "../store/moveableslice";

export const useResize = (setpolygons, setlines, boardref) => {
  const [SelectedElement, setSelectedElement] = useState(null);
  const dispatch = useDispatch();
  const dragging = useSelector((state) => state.moveable.dragging);
  const dragRef = useRef(dragging);

  useEffect(() => {
    dragRef.current = dragging;
  }, [dragging]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const ResizeType = (e, element, elementindex, pointindex) => {
    e.stopPropagation();
    if (!dragging) {
      dispatch(draggingon());
    }
    const { x, y } = getPointerPosition(e, boardref);
    setSelectedElement({
      element: element,
      index: elementindex,
      pointindex: pointindex,
    });
  };

  const Resize = (e) => {
    const isTouch = e.type.startsWith("touch");
    if (!isTouch && e.buttons !== 1) return;
    if (SelectedElement == null) return;
    const { x, y } = getPointerPosition(e, boardref);

    if (SelectedElement.element === "Line") {
      setlines((prev) =>
        prev.map((lineObj, index) => {
          if (index !== SelectedElement.index) return lineObj;

          const line = lineObj.line;
          const boundcheck = x <= 100 && x >= 0 && y <= 100 && y >= 0;

          if (!boundcheck) return lineObj;

          const updatedLine =
            SelectedElement.pointindex === 1
              ? { ...line, x1: x, y1: y }
              : { ...line, x2: x, y2: y };

          return {
            ...lineObj,
            line: updatedLine,
          };
        })
      );
    }

    if (SelectedElement.element === "Polygon") {
      setpolygons((prev) =>
        prev.map((polygon, index) => {
          if (index === SelectedElement.index) {
            return {
              ...polygon,
              polygon: polygon.polygon.map((point, i) => {
                const boundcheck = x <= 100 && x >= 0 && y <= 100 && y >= 0;
                if (boundcheck && i === SelectedElement.pointindex) {
                  return [x, y];
                }
                return point;
              }),
            };
          }
          return polygon;
        })
      );
    }
  };

  const handleMouseUp = (e) => {
    setSelectedElement(null);
    if (dragRef.current == false) {
      return;
    }

    // could be added the mouse up of use drag
    // like modularity is reduced here by a similar funciton of mouse up but okay it makes it look cleaner and more understandable but on cost of the use of some extra states
  };

  return { ResizeType, Resize };
};
