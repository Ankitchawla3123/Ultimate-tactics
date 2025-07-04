import React, { useEffect, useRef, useState } from "react";
import { getPointerPosition } from "../../utils/getPointerPosition";
import { useDrawline } from "../../hooks/useDrawline";
import { useDrag } from "../../hooks/useDrag";
import { Line, Polygon } from "../index";
import { useResize } from "../../hooks/useResize";
import Player from "./Player";

function BoardStruct({ boardref, players, setplayers }) {
  const [selected, setselected] = useState(false);
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
    polygon,
  } = useDrawline(selected, boardref);

  const { DragType, Dragline } = useDrag(
    setplygons,
    setlines,
    setplayers,
    setselected,
    previewpolygon,
    boardref
  );
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
        data-component="Board"
        width="100%"
        height="100%"
        onMouseMove={(e) => mouseMoveHandler(e)}
        onContextMenu={(e) => Stopdrawingpolygon(e)}
        onDoubleClick={(e) => e.preventDefault()}
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
          <g>
            <polygon
              points={previewpolygon()}
              style={{ cursor: "pointer" }}
              stroke="black"
              strokeWidth="0.5%"
              strokeLinecap="round"
              fillOpacity={0.4}
            />
            {polygon &&
              polygon.map((point, index) => {
                return (
                  <circle
                    key={index}
                    cx={`${point[0]}%`}
                    cy={`${point[1]}%`}
                    r="0.7%"
                    fill="black"
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      Stopdrawingpolygon(e)
                    }}
                  />
                );
              })}
          </g>
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
        {players.map((player, index) => (
          <Player
            setselected={setselected}
            key={index}
            player={player}
            DragType={DragType}
            index={index}
          />
        ))}
      </svg>
    </div>
  );
}

export default BoardStruct;
