import { useEffect, useState } from "react";

import React from "react";
import { ItemsContextMenu } from "../index";

function Polygon({
  polygon,
  DragType,
  previewpolygon,
  i,
  polygonparser,
  ResizeType,
  UpdateShape,
  DeleteShape,
}) {
  const [resizeTrigger, setResizeTrigger] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setResizeTrigger((prev) => prev + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Update = (data) => {
    UpdateShape("polygon", data, i);
  };

  const Delete = () => {
    DeleteShape("polygon", i);
  };

  return (
    <ItemsContextMenu Update={Update} Delete={Delete} Item={polygon}>
      <g>
        <polygon
          points={polygonparser(polygon.polygon)}
          style={{ cursor: "pointer", zIndex: "20" }}
          stroke={polygon.color}
          strokeWidth="0.5%"
          strokeLinecap="round"
          onMouseDown={(e) => {
            if (previewpolygon()) {
              return;
            }
            e.stopPropagation();
            DragType(e, i, "Polygon");
          }}
          fill={polygon.color}
          fillOpacity={0.4}
        />
        {polygon.polygon.map((point, index) => {
          return (
            <circle
              key={index}
              cx={`${point[0]}%`}
              cy={`${point[1]}%`}
              r="0.7%"
              fill={polygon.color}
              cursor="pointer"
              onMouseDown={(event) => {
                if (previewpolygon()) {
                  return;
                }
                event.stopPropagation();
                ResizeType(event, "Polygon", i, index);
              }}
            />
          );
        })}
      </g>
    </ItemsContextMenu>
  );
}

export default Polygon;
