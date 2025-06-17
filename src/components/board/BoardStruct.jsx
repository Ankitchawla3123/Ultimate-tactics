import React from "react";

function BoardStruct() {
  const viewportwidth = 56;

  const boardStyle = {
    width: viewportwidth + "vw",
    height: "auto",
    position: "",
    aspectRatio: "1.60",
    zIndex: 20,
  };

  return (
    <div>
      <div
        style={boardStyle}
        className="flex justify-center relative   items-center "
      >
        <svg
        //   ref={svgRef}
          width="100%"
          height="100%"
          // height='auto'
          // viewBox="0 0 500 500"
          style={{
            margin: "0",
            padding: "0",
            display: "block",
            position: "relative",
          }}
        ></svg>
      </div>
    </div>
  );
}

export default BoardStruct;
