import { useState } from "react";

export const useFormation = (setplayers) => {
  const setformation = (value) => {
    setplayers([]);
    if (value.left !== null) {
      const formation = value.left.split("").map((val) => parseInt(val));
      const length = formation.length;
      const xstart = length <= 3 ? 5 : 10;
      const ystart = 4; // 9.78
      const xgap = (46 - 10) / length;
      formation.forEach((element, index) => {
        const ygap = (100 - ystart - ystart) / (element + 1);
        for (let i = 1; i <= element; i++) {
          const player = {
            number: 3,
            color: "#FFFFFF",
            name: "",
            metadata: { type: "player", name: "player" },
            x: xstart + (index + 1) * xgap,
            y: ystart + ygap * i,
          };
          setplayers((prev) => [...prev, player]);
        }
      });
    }
    if (value.right !== null) {
      const formation = value.right.split("").map((val) => parseInt(val));
      const length = formation.length;
      const xstart = length <= 3 ? 5 : 10;
      const ystart = 4; // 9.78
      const xgap = (46 - 10) / length;
      formation.forEach((element, index) => {
        const ygap = (100 - ystart - ystart) / (element + 1);
        for (let i = 1; i <= element; i++) {
          const player = {
            number: 3,
            color: "#FFFFFF",
            name: "",
            metadata: { type: "player", name: "player" },
            x: 100 - (xstart + (index + 1) * xgap),
            y: ystart + ygap * i,
          };
          setplayers((prev) => [...prev, player]);
        }
      });
    }
  };

  return { setformation };
};
