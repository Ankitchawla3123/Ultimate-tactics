import React from "react";
import { ItemsContextMenu } from "../index";

function Marker({ line, previewpolygon, ResizeType, index }) {
  const MouseDownHandler = (event, i) => {
    if (previewpolygon()) return;
    event.stopPropagation();
    ResizeType(event, "Line", index, i);
  };

  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return (
    <g>
      {/* Touch hit areas (always active) */}
      <circle
        cx={`${line.line.x1}%`}
        cy={`${line.line.y1}%`}
        r="5%"
        fill="transparent"
        style={{
          pointerEvents: isTouchDevice ? "auto" : "none",
        }}
        onTouchStart={(event) => MouseDownHandler(event, 1)}
      />
      <circle
        cx={`${line.line.x2}%`}
        cy={`${line.line.y2}%`}
        r="5%"
        fill="transparent"
        style={{
          pointerEvents: isTouchDevice ? "auto" : "none",
        }}
        onTouchStart={(event) => MouseDownHandler(event, 2)}
      />

      {/* Visible resize handles */}
      <circle
        cx={`${line.line.x1}%`}
        cy={`${line.line.y1}%`}
        r="0.7%"
        fill={line.color}
        cursor="pointer"
        onMouseDown={(event) => MouseDownHandler(event, 1)}
      />
      <circle
        cx={`${line.line.x2}%`}
        cy={`${line.line.y2}%`}
        r="0.7%"
        fill={line.color}
        cursor="pointer"
        onMouseDown={(event) => MouseDownHandler(event, 2)}
      />
    </g>
  );
}

function Line({
  index,
  line,
  DragType,
  ResizeType,
  previewpolygon,
  UpdateShape,
  DeleteShape,
}) {
  const Update = (data) => {
    UpdateShape("line", data, index);
  };

  const Delete = () => {
    DeleteShape("line", index);
  };

  return (
    <ItemsContextMenu Update={Update} Delete={Delete} Item={line}>
      <g>
        <defs>
          <marker // end points
            id={`triangle-start-${index}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="0.8%"
            markerHeight="0.8%"
            orient="auto"
          >
            <path d="M10 0 L0 5 L10 10 Z" fill={line.color} />
          </marker>
          <marker
            id={`triangle-end-${index}`}
            viewBox="0 0 10 10"
            refX="2"
            refY="5"
            markerWidth="0.8%"
            markerHeight="0.8%"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={line.color} />
          </marker>
        </defs>

        <line // increased touch area
          x1={`${line.line.x1}%`}
          y1={`${line.line.y1}%`}
          x2={`${line.line.x2}%`}
          y2={`${line.line.y2}%`}
          stroke="transparent"
          strokeWidth="4%"
          onTouchStart={(e) => DragType(e, index, "Line")}
        />

        <line // Actual line
          x1={`${line.line.x1}%`}
          y1={`${line.line.y1}%`}
          x2={`${line.line.x2}%`}
          y2={`${line.line.y2}%`}
          style={{ cursor: "pointer" }}
          stroke={line.color}
          strokeWidth="0.5%"
          strokeLinecap="round"
          strokeDasharray={line.linetype == "dashed" ? "1%" : null}
          markerStart={
            line.leftend === "left-arrow"
              ? `url(#triangle-start-${index})`
              : null
          }
          markerEnd={
            line.rightend === "right-arrow"
              ? `url(#triangle-end-${index})`
              : null
          }
          onMouseDown={(e) => {
            DragType(e, index, "Line");
          }}
        />

        <Marker // resize circles
          line={line}
          previewpolygon={previewpolygon}
          ResizeType={ResizeType}
          index={index}
        />
      </g>
    </ItemsContextMenu>
  );
}

export default Line;
