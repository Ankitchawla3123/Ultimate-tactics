import { useState } from "react";

export const useFormation = (setplayers) => {
  const validformation = (value) => {
    const formation = value.map((val) => parseInt(val));
    formation = formation.map((val) => parseInt(val));
    const sum = formation.reduce((prev, curr) => prev + curr, 0);
    if (sum == 10) {
      return 0;
    } else {
      return 10 - sum;
    }
  };

  const setformation = (value) => {
    const formation = value.split("").map((val) => parseInt(val));
    const length = formation.length;
    const xstart = 5.5;
    const ystart = 5; // 9.78
    formation.forEach((element, index) => {
      const ygap = (100 - ystart - ystart) / (element + 1);
      for (let i = 1; i <= element; i++) {
        const player = {
          number: 3,
          color: "#FFFFFF",
          name: "",
          metadata: { type: "player", name: "player" },
          x: (index + 1) * 10,
          y: ystart + ygap * i,
        };
        setplayers((prev) => [...prev, player]);
      }
    });
  };

  return { setformation };
};
