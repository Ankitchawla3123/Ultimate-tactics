import React, { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../../utils/getPointerPosition";
import { useDrawline } from "../../hooks/useDrawline";
import { useDrag } from "../../hooks/useDrag";

function BoardStruct() {
  const boardref = useRef(null);

  const {
    polygonparser,
    polygons,
    Stopdrawingpolygon,
    previewpolygon,
    previewline,
    drawline,
    lines,
    setlines,
  } = useDrawline(boardref);

  const { DragType, Dragline } = useDrag(setlines, boardref);
  const mouseMoveHandler = (e) => {
    drawline(e);
    Dragline(e);
  };

  return (
    <div className="w-full h-full">
      <svg
        ref={boardref}
        width="100%"
        height="100%"
        onMouseMove={(e) => mouseMoveHandler(e)}
        onContextMenu={(e) => Stopdrawingpolygon(e)}
      >
        {previewline && (
          <line
            x1={`${previewline.x1}%`}
            y1={`${previewline.y1}%`}
            x2={`${previewline.x2}%`}
            y2={`${previewline.y2}%`}
            style={{ cursor: "pointer" }}
            stroke="black"
            strokeWidth="0.5%"
            strokeLinecap="round"
          />
        )}
        {previewpolygon() && (
          <polygon
            points={previewpolygon()}
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
            onMouseDown={(e) => DragType(e, i, "Line")}
          />
        ))}

        {polygons.map((polygon, i) => (
          <polygon
            key={i}
            points={polygonparser(polygon)}
            style={{ cursor: "pointer" }}
            stroke="black"
            strokeWidth="0.5%"
            strokeLinecap="round"
            onMouseDown={(e) => {
              if (previewpolygon()) {
                return;
              }
              e.stopPropagation();
              DragType(e, i, "Polygon");
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default BoardStruct;
