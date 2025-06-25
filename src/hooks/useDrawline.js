import { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../utils/getPointerPosition";
import { useSelector } from "react-redux";

export const useDrawline = (boardref) => {
  const svg = boardref.current;

  const drawtype = useSelector((state) => state.moveable.drawtype);
  const [previewline, setline] = useState(null);
  const [lines, setlines] = useState([]);
  const lineRef = useRef(previewline);
  const dragging = useSelector((state) => state.moveable.dragging);
  const [polygon, setpolypoints] = useState([]);
  const [polygons, setplygons] = useState([]);
  const [nextpointforpoly, setnextpointforpoly] = useState([]);
  const typeRef = useRef(drawtype);
  const polyRef = useRef(polygon);
  const dragRef = useRef(dragging);

  useEffect(() => {
    polyRef.current = polygon;
  }, [polygon]);

  useEffect(() => {
    lineRef.current = previewline;
  }, [previewline]);

  useEffect(() => {
    dragRef.current = dragging;
  }, [dragging]);

  useEffect(() => {
    typeRef.current = drawtype;
  }, [drawtype]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    boardref.current.addEventListener("click", handleclick);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      if (boardref.current) {
        boardref.current.removeEventListener("click", handleclick);
      }
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
    } else if (drawtype === "polygon" && polygon.length > 0) {
      setnextpointforpoly([x, y]);
    }
  };

  const cleanline = () => {
    setline(null);
  };

  const handleclick = (e) => {

    if (typeRef.current !== "polygon" || dragRef.current) return;

    const { x, y } = getPointerPosition(e, boardref);
    if (dragging) {
      return;
    }
    const newPoints = [...polyRef.current, [x, y]];
    setpolypoints(newPoints);
  };

  const handleMouseUp = (e) => {
    const currentLine = lineRef.current;
    if (!currentLine) return;
    setlines((prev) => [...prev, currentLine]);
    cleanline();
  };

  const polygonparser = (polygon) => {
    if (!svg) return "";

    const { width, height } = svg.getBoundingClientRect();

    const result = polygon
      .map(([xPercent, yPercent]) => {
        const x = (xPercent / 100) * width;
        const y = (yPercent / 100) * height;
        return `${x},${y}`;
      })
      .join(" ");

    return result;
  };

  const previewpolygon = () => {
    if (polygon.length === 0) {
      return "";
    }

    const isPreviewPointValid =
      nextpointforpoly.length === 2 &&
      !isNaN(nextpointforpoly[0]) &&
      !isNaN(nextpointforpoly[1]);

    const previewPoints = isPreviewPointValid
      ? [...polygon, nextpointforpoly]
      : polygon;

    return polygonparser(previewPoints);
  };

  const Stopdrawingpolygon = (e) => {
    e.preventDefault();
    if (polygon.length <= 2) {
      setpolypoints([]);
      setnextpointforpoly([]);
      return;
    }
    setplygons((prev) => [...prev, polygon]);
    setpolypoints([]);
    setnextpointforpoly([]);
  };

  return {
    Stopdrawingpolygon,
    polygonparser,
    setplygons,
    polygons,
    previewpolygon,
    previewline,
    drawline,
    lines,
    setlines,
  };
};
