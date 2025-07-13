import React, { useEffect, useState } from "react";
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

  // Detect if the device supports touch
  const isTouchDevice = typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

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
            if (previewpolygon()) return;
            e.stopPropagation();
            DragType(e, i, "Polygon");
          }}
          onTouchStart={(e) => {
            if (previewpolygon()) return;
            e.stopPropagation();
            DragType(e, i, "Polygon");
          }}
          fill={polygon.color}
          fillOpacity={0.4}
        />
        {polygon.polygon.map((point, index) => (
          <React.Fragment key={index}>
            {/* Larger transparent circle (used only for touch) */}
            <circle
              cx={`${point[0]}%`}
              cy={`${point[1]}%`}
              r="5%"
              fill="transparent"
              style={{
                pointerEvents: isTouchDevice ? "auto" : "none",
              }}
              onTouchStart={(event) => {
                if (previewpolygon()) return;
                event.stopPropagation();
                ResizeType(event, "Polygon", i, index);
              }}
            />

            {/* Smaller visible circle for mouse interactions */}
            <circle
              cx={`${point[0]}%`}
              cy={`${point[1]}%`}
              r="0.7%"
              fill={polygon.color}
              cursor="pointer"
              onMouseDown={(event) => {
                if (previewpolygon()) return;
                event.stopPropagation();
                ResizeType(event, "Polygon", i, index);
              }}
            />
          </React.Fragment>
        ))}
      </g>
    </ItemsContextMenu>
  );
}

export default Polygon;
