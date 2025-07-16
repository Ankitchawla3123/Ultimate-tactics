import { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../utils/getPointerPosition";
import { useDispatch, useSelector } from "react-redux";
import { col } from "motion/react-client";
import { setpolydrawn } from "../store/moveableslice";

export const useDrawline = (selected, boardref) => {
  const svg = boardref.current;

  const dispatch = useDispatch();

  const drawtype = useSelector((state) => state.board.drawtype);
  const dragging = useSelector((state) => state.moveable.dragging);
  const mode = useSelector((state) => state.board.mode);
  const selectedplayer = useSelector((state) => state.player.selectedplayer);
  const color = useSelector((state) => state.board.color);
  const leftend = useSelector((state) => state.board.LeftEnd);
  const rightend = useSelector((state) => state.board.RightEnd);
  const linetype = useSelector((state) => state.board.LineType);
  const polygondrawn = useSelector((state) => state.moveable.dragging);
  const menutoggle = useSelector((state) => state.board.menuselect);
  const aspect = useSelector((state) => state.board.aspect);

  const [previewline, setline] = useState(null);
  const [lines, setlines] = useState([]);
  const lineRef = useRef(previewline);
  const aspectref = useRef(aspect);

  const [polygon, setpolypoints] = useState([]);
  const [polygons, setpolygons] = useState([]);
  const [nextpointforpoly, setnextpointforpoly] = useState([]);

  const typeRef = useRef(drawtype);
  const polyRef = useRef(polygon);
  const dragRef = useRef(dragging);
  const modeRef = useRef(mode);
  const selectedRef = useRef(selected);
  const colorRef = useRef(color);
  const linetyperef = useRef({
    leftend: leftend,
    rightend: rightend,
    linetype: linetype,
  });

  useEffect(() => {
    polyRef.current = polygon;
    if (polygon.length == 0) {
      dispatch(setpolydrawn(false));
    } else if (polygondrawn == false) {
      dispatch(setpolydrawn(true));
    }
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

  // clear drawing polygon if clicked on menu or somewhere
  useEffect(() => {
    ClearPolygon();
  }, [drawtype, mode, selectedplayer, color, menutoggle]);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    aspectref.current = aspect;
  }, [aspect]);

  useEffect(() => {
    linetyperef.current = {
      leftend,
      rightend,
      linetype,
    };
  }, [leftend, rightend, linetype]);

  useEffect(() => {
    setlines((prevLines) =>
      prevLines.map((item) => {
        if (!item.aspect || item.aspect === aspect) return item;

        return {
          ...item,
          line: {
            x1: aspect == "10 / 16" ? 100 - item.line.y1 : item.line.y1,
            y1: aspect == "16 / 10" ? 100 - item.line.x1 : item.line.x1,
            x2: aspect == "10 / 16" ? 100 - item.line.y2 : item.line.y2,
            y2: aspect == "16 / 10" ? 100 - item.line.x2 : item.line.x2,
          },
          aspect, // update to current aspect
        };
      })
    );

    setpolygons((prevPolygons) =>
      prevPolygons.map((item) => {
        if (!item.aspect || item.aspect === aspect) return item;

        const newPoints = item.polygon.map(([x, y]) =>
          aspect === "10 / 16" ? [100 - y, x] : [y, 100 - x]
        );

        return {
          ...item,
          polygon: newPoints,
          aspect,
        };
      })
    );
  }, [aspect]);

  useEffect(() => {
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("mouseup", handleMouseUp);
    boardref.current.addEventListener("click", handleclick);
    return () => {
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("mouseup", handleMouseUp);
      if (boardref.current) {
        boardref.current.removeEventListener("click", handleclick);
      }
    };
  }, []);

  const emptlineref = useRef(false);
  const emptpolygonref = useRef(false);
  useEffect(() => {
    const handleWindowLoad = () => {
      const storedLines = localStorage.getItem("lines");
      const storedPolygons = localStorage.getItem("polygons");
      if (storedLines === "[]") {
        emptlineref.current = true;
      }
      if (storedPolygons === "[]") {
        emptpolygonref.current = true;
      }
      if (storedLines) {
        try {
          setlines(JSON.parse(storedLines));
        } catch (e) {
          console.error("Failed to parse lines from localStorage", e);
        }
      }

      if (storedPolygons) {
        try {
          setpolygons(JSON.parse(storedPolygons));
        } catch (e) {
          console.error("Failed to parse polygons from localStorage", e);
        }
      }
    };

    if (document.readyState === "complete") {
      handleWindowLoad();
    } else {
      window.addEventListener("load", handleWindowLoad);
      return () => window.removeEventListener("load", handleWindowLoad);
    }
  }, []);

  useEffect(() => {
    if (emptlineref.current) {
      localStorage.setItem("lines", JSON.stringify(lines));
    }
    emptlineref.current = true;
  }, [lines]);

  useEffect(() => {
    if (emptpolygonref.current) {
      localStorage.setItem("polygons", JSON.stringify(polygons));
    }
    emptpolygonref.current = true;
  }, [polygons]);

  const drawline = (e) => {
    if (mode !== "draw" || dragging || selectedplayer != null || selected) {
      return;
    }

    const { x, y } = getPointerPosition(e, boardref);
    if (drawtype === "line") {
      const isTouchEvent = e.type.startsWith("touch");
      if (!isTouchEvent && e.buttons !== 1) {
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
      const { leftend, rightend, linetype } = linetyperef.current;

      setlines((prev) => [
        ...prev,
        {
          metadata: { type: "shape", name: "line" },
          color: colorRef.current,
          line: currentLine,
          leftend: leftend,
          rightend: rightend,
          linetype: linetype,
          aspect: aspectref.current,
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
        {
          metadata: { type: "shape", name: "polygon" },
          color: colorRef.current,
          polygon: newpolygon,
          aspect: aspectref.current,
        },
      ]);
    }
    ClearPolygon();
  };

  const ClearPolygon = () => {
    setpolypoints([]);
    setnextpointforpoly([]);
  };

  const clearlines = () => {
    setlines([]);
  };

  const clearpolygons = () => {
    setpolygons([]);
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
    clearlines,
    clearpolygons,
  };
};
