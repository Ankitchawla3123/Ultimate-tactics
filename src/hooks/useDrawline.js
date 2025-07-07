import { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../utils/getPointerPosition";
import { useSelector } from "react-redux";

export const useDrawline = (selected, boardref) => {
  const svg = boardref.current;

  const drawtype = useSelector((state) => state.board.drawtype);
  const dragging = useSelector((state) => state.moveable.dragging);
  const mode = useSelector((state) => state.board.mode);
  const selectedplayer = useSelector((state) => state.player.selectedplayer);

  const [previewline, setline] = useState(null);
  const [lines, setlines] = useState([]);
  const lineRef = useRef(previewline);

  const [polygon, setpolypoints] = useState([]);
  const [polygons, setpolygons] = useState([]);
  const [nextpointforpoly, setnextpointforpoly] = useState([]);

  const typeRef = useRef(drawtype);
  const polyRef = useRef(polygon);
  const dragRef = useRef(dragging);
  const modeRef = useRef(mode);
  const selectedRef = useRef(selected);

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
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    ClearPolygon();
  }, [drawtype, mode, selectedplayer]);

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
    // mouse move handle
    if (mode !== "draw" || dragging || selectedplayer != null || selected) {
      return;
    }

    const { x, y } = getPointerPosition(e, boardref);
    if (drawtype === "line") {
      if (e.buttons !== 1) {
        return;
      }
      if (previewline == null) {
        if (e.target.dataset.component !== "Board") {
          return;
        }
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
    if (
      modeRef.current !== "draw" ||
      typeRef.current !== "polygon" ||
      dragRef.current ||
      selectedRef.current ||
      (polyRef.current.length == 0 && e.target.dataset.component !== "Board")
    ) {
      return;
    }

    const { x, y } = getPointerPosition(e, boardref);
    if (dragging) {
      return;
    }

    const newPoints = [...polyRef.current, [x, y]];
    setpolypoints(newPoints);
  };

  const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

  const handleMouseUp = (e) => {
    const currentLine = lineRef.current;
    if (!currentLine) return;
    const { x1, y1, x2, y2 } = currentLine;
    var d = distance(x1, y1, x2, y2);
    if (d > 1.2) {
      setlines((prev) => [
        ...prev,
        {
          metadata: { type: "shape", name: "line" },
          line: currentLine,
        },
      ]);
    }

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
    const newpolygon = polygon;
    if (e.type == "click") {
      newpolygon.pop();
    }
    if (newpolygon.length > 2) {
      setpolygons((prev) => [
        ...prev,
        { metadata: { type: "shape", name: "polygon" }, polygon: newpolygon },
      ]);
    }
    ClearPolygon();
  };

  const ClearPolygon = () => {
    setpolypoints([]);
    setnextpointforpoly([]);
  };

  return {
    Stopdrawingpolygon,
    polygonparser,
    setpolygons,
    polygons,
    previewpolygon,
    previewline,
    drawline,
    lines,
    setlines,
    polygon,
  };
};
