import React from "react";

function BoardStruct() {
  const viewportwidth = 56;
  return (
    <div>
      <div className="flex justify-center relative   items-center ">
        <svg
          width="100%"
          height="100%"
          style={{
            margin: "0",
            padding: "0",
            display: "block",
            position: "relative",
          }}
        >
          <g height="100" width="100" xmlns="http://www.w3.org/2000/svg">
            <circle r="45" cx="50" cy="50" fill="red" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default BoardStruct;
