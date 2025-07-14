import React, { useEffect, useRef, useState } from "react";
import { useDrawline } from "../../hooks/useDrawline";
import { useDrag } from "../../hooks/useDrag";
import { Line, Polygon, Player } from "../index";
import { useResize } from "../../hooks/useResize";
import { useDispatch, useSelector } from "react-redux";
import { useShape } from "../../hooks/useShape";
import { setclearval } from "../../store/boardslice";

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
    clearlines,
    clearpolygons,
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

  const dispatch = useDispatch();
  const color = useSelector((state) => state.board.color);
  const linetype = useSelector((state) => state.board.LineType);
  const clearval = useSelector((state) => state.board.clearval);

  useEffect(() => {
    if (!clearval) return;

    switch (clearval) {
      case "lines":
        clearlines();
        break;

      case "polygons":
        clearpolygons();
        break;

      case "players":
        setplayers([]);
        break;

      case "all":
        clearlines();
        clearpolygons();
        setplayers([]);
        break;

      default:
        break;
    }

    dispatch(setclearval(""));
  }, [clearval, clearlines, clearpolygons, setplayers, dispatch]);

  const mouseMoveHandler = (e) => {
    drawline(e);
    Dragline(e);
    Resize(e);
  };

  return (
    <div className="w-full h-full">
      <svg
        ref={boardref}
        className="touch-none"
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
            strokeDasharray={linetype == "dashed" ? "1%" : null}
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
