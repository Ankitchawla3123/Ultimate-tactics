import { useState } from "react";
import chroma from "chroma-js";

export const useFormation = (setplayers) => {
  const getOpposingColor = (color) => {
    try {
      const base = chroma(color);
      const [h, s, l] = base.hsl();

      const isLowSat = s < 0.1;
      const isVeryLight = l > 0.85;

      if (isLowSat || isVeryLight) {
        const newHue = (h + 200) % 360 || 180;
        const newSat = Math.max(0.5, s + 0.5);
        const newLight = 0.3 + 0.4 * (1 - l);

        return chroma.hsl(newHue, newSat, newLight).hex();
      }

      const rotatedHue = (h + 180) % 360;
      const newSat = Math.max(0.4, s);
      const newLight = Math.min(Math.max(l, 0.3), 0.7);

      return chroma.hsl(rotatedHue, newSat, newLight).hex();
    } catch {
      return "#000000";
    }
  };

  const setformation = (value) => {
    setplayers([]);

    if (value.left !== null) {
      const formation = value.left.split("").map(Number);
      const length = formation.length;
      const xstart = length <= 3 ? 7 : 12;
      const ystart = 1.5;
      const xgap = (46 - 12) / length;

      const GK = {
        number: 3,
        color: getOpposingColor(value.leftColor),
        name: "",
        metadata: { type: "player", name: "player" },
        x: 12,
        y: 50,
      };
      setplayers((prev) => [...prev, GK]);

      formation.forEach((element, index) => {
        const ygap = (100 - ystart * 2) / (element + 1);
        for (let i = 1; i <= element; i++) {
          const player = {
            number: 3,
            color: value.leftColor,
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
      const formation = value.right.split("").map(Number);
      const length = formation.length;
      const xstart = length <= 3 ? 7 : 12;
      const ystart = 1.5;
      const xgap = (46 - 12) / length;

      // GK with complementary color to rightColor
      const GK = {
        number: 3,
        color: getOpposingColor(value.rightColor),
        name: "",
        metadata: { type: "player", name: "player" },
        x: 88,
        y: 50,
      };
      setplayers((prev) => [...prev, GK]);

      formation.forEach((element, index) => {
        const ygap = (100 - ystart * 2) / (element + 1);
        for (let i = 1; i <= element; i++) {
          const player = {
            number: 3,
            color: value.rightColor,
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
