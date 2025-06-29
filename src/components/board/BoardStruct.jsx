import React, { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../../utils/getPointerPosition";
import { useDrawline } from "../../hooks/useDrawline";
import { useDrag } from "../../hooks/useDrag";
import { Line, Polygon } from "../index";
import { useResize } from "../../hooks/useResize";

function BoardStruct() {
  const boardref = useRef(null);

  const {
    polygonparser,
    polygons,
    Stopdrawingpolygon,
    setplygons,
    previewpolygon,
    previewline,
    drawline,
    lines,
    setlines,
  } = useDrawline(boardref);

  const { DragType, Dragline } = useDrag(setplygons, setlines, boardref);
  const { Resize, ResizeType } = useResize(setplygons, setlines, boardref);

  const mouseMoveHandler = (e) => {
    drawline(e);
    Dragline(e);
    Resize(e);
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
          <Line
            key={i}
            index={i}
            line={line}
            DragType={DragType}
            ResizeType={ResizeType}
            previewpolygon={previewpolygon}
          />
        ))}

        {polygons.map((polygon, i) => (
          <Polygon
            key={i}
            polygon={polygon}
            polygonparser={polygonparser}
            previewpolygon={previewpolygon}
            DragType={DragType}
            ResizeType={ResizeType}
            i={i}
          />
        ))}
      </svg>
    </div>
  );
}

export default BoardStruct;
