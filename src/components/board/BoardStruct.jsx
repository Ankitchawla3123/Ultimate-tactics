import React, { useEffect, useRef, useState } from "react";
import { useDrawline } from "../../hooks/useDrawline";
import { useDrag } from "../../hooks/useDrag";
import { Line, Polygon } from "../index";
import { useResize } from "../../hooks/useResize";
import Player from "./Player";
import { useSelector } from "react-redux";
import { useShape } from "../../hooks/useShape";

function BoardStruct({
  boardref,
  players,
  setplayers,
  UpdatePlayer,
  DeletePlayer,
}) {
  const [selected, setselected] = useState(false);
  const {
    polygonparser,
    polygons,
    Stopdrawingpolygon,
    setpolygons,
    previewpolygon,
    previewline,
    drawline,
    lines,
    setlines,
    polygon,
  } = useDrawline(selected, boardref);

  const { DragType, Dragline } = useDrag(
    setpolygons,
    setlines,
    setplayers,
    setselected,
    previewpolygon,
    boardref
  );
  const { Resize, ResizeType } = useResize(setpolygons, setlines, boardref);
  const { UpdateShape, DeleteShape } = useShape(setlines, setpolygons);

  const color = useSelector((state) => state.board.color);

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
        onTouchMove={(e) => mouseMoveHandler(e)}
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
            stroke={color}
            strokeWidth="0.5%"
            strokeLinecap="round"
          />
        )}
        {previewpolygon() && (
          <g>
            <polygon
              points={previewpolygon()}
              style={{ cursor: "pointer" }}
              stroke={color}
              fill={color}
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
                    fill={color}
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      Stopdrawingpolygon(e);
                    }}
                  />
                );
              })}
          </g>
        )}
        {lines.map((line, i) => (
          <Line
            UpdateShape={UpdateShape}
            DeleteShape={DeleteShape}
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
            UpdateShape={UpdateShape}
            DeleteShape={DeleteShape}
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
            UpdatePlayer={UpdatePlayer}
            DeletePlayer={DeletePlayer}
          />
        ))}
      </svg>
    </div>
  );
}

export default BoardStruct;
