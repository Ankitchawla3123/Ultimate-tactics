import React from "react";

function Football({ index,item, radius = 1.2 , setselected,DragType}) {
  const patchRadius = radius * 0.4; //
  const { x, y } = item;
  return (
    <g
      onDoubleClick={(e) => {
        e.stopPropagation();
        setselected(true);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setselected(true);
      }}
      onMouseDown={(e) => {
        setselected(true);
        DragType(e, index, "Football");
      }}
      onTouchStart={(e) => {
        setselected(true);
        DragType(e, index, "Football");
      }}
      style={{ cursor: "pointer" }}
    >
      {/* Outer football */}
      <circle
        cx={`${x}%`}
        cy={`${y}%`}
        r={`${radius}%`}
        fill="white"
        stroke="black"
        strokeWidth="0.3%"
      />

      {/* Central black patch */}
      <circle cx={`${x}%`} cy={`${y}%`} r={`${patchRadius}%`} fill="black" />

      {/* Surrounding patches */}
      <circle
        cx={`${x - radius * 0.6}%`}
        cy={`${y}%`}
        r={`${patchRadius * 0.6}%`}
        fill="black"
      />
      <circle
        cx={`${x + radius * 0.6}%`}
        cy={`${y}%`}
        r={`${patchRadius * 0.6}%`}
        fill="black"
      />
      <circle
        cx={`${x}%`}
        cy={`${y - radius * 0.6}%`}
        r={`${patchRadius * 0.6}%`}
        fill="black"
      />
      <circle
        cx={`${x}%`}
        cy={`${y + radius * 0.6}%`}
        r={`${patchRadius * 0.6}%`}
        fill="black"
      />
    </g>
  );
}

export default Football;
