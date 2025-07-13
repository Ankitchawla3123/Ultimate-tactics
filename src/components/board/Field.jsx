import React from "react";

function FootballField({ horizontal = false }) {
  const penaltySpotRadius = 5;
  const penaltyBox = 200;
  const goal = 0;
  const penaltyArcRadius = 100;
  const midpoint = (goal + penaltyBox) / 2;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={horizontal ? "0 0 1600 1000" : "0 0 1000 1600"}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {horizontal ? (
        <>
          {/* Horizontal field - 1600x1000 (16:10) */}
          <rect
            x="0"
            y="0"
            width="1600"
            height="1000"
            fill="#219B1F"
            stroke="#000"
            strokeWidth="5"
          />
          <circle
            cx="800"
            cy="500"
            r="170"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <rect
            x="0"
            y="200"
            width="200"
            height="600"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <rect
            x="1400"
            y="200"
            width="200"
            height="600"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <rect
            x="0"
            y="375"
            width="75"
            height="250"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <rect
            x="1525"
            y="375"
            width="75"
            height="250"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <circle
            cx={midpoint + 28}
            cy="500"
            r={penaltySpotRadius}
            fill="#000"
          />
          <circle
            cx={1600 - midpoint - 28}
            cy="500"
            r={penaltySpotRadius}
            fill="#000"
          />
          <rect
            x="0"
            y="450"
            width="15"
            height="100"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <rect
            x="1585"
            y="450"
            width="15"
            height="100"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <line
            x1="800"
            y1="0"
            x2="800"
            y2="1000"
            stroke="#000"
            strokeWidth="5"
          />
          <path
            d={`M 200,${
              500 - penaltyArcRadius
            } A ${penaltyArcRadius},${penaltyArcRadius} 0 0,1 200,${
              500 + penaltyArcRadius
            }`}
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <path
            d={`M 1400,${
              500 - penaltyArcRadius
            } A ${penaltyArcRadius},${penaltyArcRadius} 0 0,0 1400,${
              500 + penaltyArcRadius
            }`}
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
        </>
      ) : (
        <>
          {/* Vertical field - 1000x1600 (10:16) */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="1600"
            fill="#4CAF50"
            stroke="#000"
            strokeWidth="5"
          />
          <circle
            cx="500"
            cy="800"
            r="170"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <rect
            x="200"
            y="0"
            width="600"
            height="200"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <rect
            x="200"
            y="1400"
            width="600"
            height="200"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <rect
            x="375"
            y="0"
            width="250"
            height="75"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <rect
            x="375"
            y="1525"
            width="250"
            height="75"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <circle
            cx="500"
            cy={midpoint + 28}
            r={penaltySpotRadius}
            fill="#000"
          />
          <circle
            cx="500"
            cy={1600 - midpoint - 28}
            r={penaltySpotRadius}
            fill="#000"
          />
          <rect
            x="450"
            y="0"
            width="100"
            height="15"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <rect
            x="450"
            y="1585"
            width="100"
            height="15"
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <line
            x1="0"
            y1="800"
            x2="1000"
            y2="800"
            stroke="#000"
            strokeWidth="5"
          />
          <path
            d={`M ${
              500 - penaltyArcRadius
            },200 A ${penaltyArcRadius},${penaltyArcRadius} 0 0,1 ${
              500 + penaltyArcRadius
            },200`}
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
          <path
            d={`M ${
              500 - penaltyArcRadius
            },1400 A ${penaltyArcRadius},${penaltyArcRadius} 0 0,0 ${
              500 + penaltyArcRadius
            },1400`}
            fill="none"
            stroke="#000"
            strokeWidth="5"
          />
        </>
      )}
    </svg>
  );
}

export default FootballField;
