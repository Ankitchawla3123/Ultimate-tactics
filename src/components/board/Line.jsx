import React, { useState } from "react";
import { ItemsContextMenu } from "../index";

function Marker({ line, previewpolygon, ResizeType, index }) {
  const MouseDownHandler = (event, i) => {
    if (previewpolygon()) {
      return;
    }
    event.stopPropagation();
    ResizeType(event, "Line", index, i);
  };

  return (
    <g>
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
        <line
          x1={`${line.line.x1}%`}
          y1={`${line.line.y1}%`}
          x2={`${line.line.x2}%`}
          y2={`${line.line.y2}%`}
          style={{ cursor: "pointer" }}
          stroke={line.color}
          strokeWidth="0.5%"
          strokeLinecap="round"
          onMouseDown={(e) => {
            DragType(e, index, "Line");
          }}
        />
        <Marker
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
