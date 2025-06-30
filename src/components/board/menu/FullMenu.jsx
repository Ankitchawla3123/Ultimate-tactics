import { LineSquiggle, Move } from "lucide-react";
import React from "react";
import { DropMenu } from "../../index";

function FullMenu() {
  return (
    <div>
      <DropMenu
        placeholder={"Mode"}
        label={"Features"}
        options={[
          {
            value: "drag",
            placeholder: (
              <span className="flex items-center gap-1">
                <Move className="w-1/4 h-1/4" />
                Drag
              </span>
            ),
          },
          {
            value: "draw",
            placeholder: (
              <span className="flex items-center gap-1">
                <LineSquiggle className="w-1/4 h-1/4" />
                Draw
              </span>
            ),
          },
        ]}
        Default={"drag"}
      />
    </div>
  );
}

export default FullMenu;
