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

  const getNumber = (
    rowIndex,
    totalRows,
    used,
    force10 = false,
    isRight = false,
    isOnlyStriker = false
  ) => {
    if (isOnlyStriker && !used.has(9)) {
      used.add(9);
      return 9;
    }

    if (force10 && !used.has(10)) {
      used.add(10);
      return 10;
    }

    let preferred = [];
    let fallback = [];

    const isLast = rowIndex === totalRows - 1;
    const isFirst = rowIndex === 0;

    if (isFirst) {
      preferred = [2, 3, 4, 5];
      fallback = [12, 13, 66, 22, 24];
    } else if (isLast) {
      preferred = [7, 9, 11, 19];
      fallback = [17, 30, 20, 18, 26];
    } else {
      preferred = [6, 8]; // exclude 10
      fallback = [14, 21, 23, 16, 15, 25];
    }

    // Reverse preferred if right side and in first or last row
    if (isRight && (isFirst || isLast)) {
      preferred.reverse();
    }

    const pool = [
      ...preferred.filter((n) => n !== 10),
      ...fallback.filter((n) => n !== 10),
    ];

    for (const num of pool) {
      if (!used.has(num)) {
        used.add(num);
        return num;
      }
    }

    let n = 27;
    while (used.has(n)) n++;
    used.add(n);
    return n;
  };

  const setformation = (value) => {
    setplayers([]);

    const usedNumbersLeft = new Set();
    const usedNumbersRight = new Set();

    // LEFT SIDE
    if (value.left !== null) {
      const formation = value.left.split("").map(Number);
      const totalRows = formation.length;
      const xstart = totalRows <= 3 ? 7 : 12;
      const ystart = 1.5;
      const xgap = (46 - 12) / totalRows;

      setplayers((prev) => [
        ...prev,
        {
          number: 1,
          color: getOpposingColor(value.leftColor),
          name: "",
          metadata: { type: "player", name: "player" },
          x: 12,
          y: 50,
        },
      ]);

      formation.forEach((count, rowIndex) => {
        const ygap = (100 - ystart * 2) / (count + 1);
        const isSecondLastRow = rowIndex === totalRows - 2;
        const isLastRow = rowIndex === totalRows - 1;
        const isOnlyStriker = isLastRow && count === 1;

        for (let i = 1; i <= count; i++) {
          const isLastInRow = i === count;
          const force10 = isSecondLastRow && isLastInRow;

          const number = getNumber(
            rowIndex,
            totalRows,
            usedNumbersLeft,
            force10,
            false,
            isOnlyStriker
          );

          setplayers((prev) => [
            ...prev,
            {
              number,
              color: value.leftColor,
              name: "",
              metadata: { type: "player", name: "player" },
              x: xstart + (rowIndex + 1) * xgap,
              y: ystart + ygap * i,
            },
          ]);
        }
      });
    }

    // RIGHT SIDE
    if (value.right !== null) {
      const formation = value.right.split("").map(Number);
      const totalRows = formation.length;
      const xstart = totalRows <= 3 ? 7 : 12;
      const ystart = 1.5;
      const xgap = (46 - 12) / totalRows;

      setplayers((prev) => [
        ...prev,
        {
          number: 1,
          color: getOpposingColor(value.rightColor),
          name: "",
          metadata: { type: "player", name: "player" },
          x: 88,
          y: 50,
        },
      ]);

      formation.forEach((count, rowIndex) => {
        const ygap = (100 - ystart * 2) / (count + 1);
        const isSecondLastRow = rowIndex === totalRows - 2;
        const isLastRow = rowIndex === totalRows - 1;
        const isOnlyStriker = isLastRow && count === 1;

        for (let i = 1; i <= count; i++) {
          const isFirstInRow = i === 1;
          const force10 = isSecondLastRow && isFirstInRow;

          const number = getNumber(
            rowIndex,
            totalRows,
            usedNumbersRight,
            force10,
            true,
            isOnlyStriker
          );

          setplayers((prev) => [
            ...prev,
            {
              number,
              color: value.rightColor,
              name: "",
              metadata: { type: "player", name: "player" },
              x: 100 - (xstart + (rowIndex + 1) * xgap),
              y: ystart + ygap * i,
            },
          ]);
        }
      });
    }
  };

  return { setformation };
};
