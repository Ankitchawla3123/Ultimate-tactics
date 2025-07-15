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
    isOnlyStriker = false,
    isMidfieldSpecial = false,
    playerIndexInRow = 0,
    totalInRow = 0
  ) => {
    // STRIKER: only one in last row → number 9
    if (isOnlyStriker && !used.has(9)) {
      used.add(9);
      return 9;
    }

    // MIDFIELD: special case for more than 3 players → assign 6 and 8 to middle two
    if (isMidfieldSpecial) {
      const mid1 = Math.floor((totalInRow - 1) / 2);
      const mid2 = Math.ceil((totalInRow - 1) / 2);

      if (playerIndexInRow === mid1 && !used.has(6)) {
        used.add(6);
        return 6;
      }
      if (playerIndexInRow === mid2 && !used.has(8)) {
        used.add(8);
        return 8;
      }
    }

    if (force10 && !used.has(10)) {
      used.add(10);
      return 10;
    }

    let preferred = [];
    let fallback = [];

    const isFirst = rowIndex === 0;
    const isLast = rowIndex === totalRows - 1;

    if (isFirst) {
      preferred = [2, 3, 4, 5];
      fallback = [12, 13, 66, 22, 24];
    } else if (isLast) {
      preferred = [7, 9, 11, 19];
      fallback = [17, 30, 20, 18, 26];
    } else {
      preferred = [6, 8]; // handled separately if needed
      fallback = [14, 21, 23, 16, 15, 25];
    }

    if (isRight && (isFirst || isLast)) {
      preferred.reverse();
    }

    const pool = [...preferred.filter((n) => n !== 10), ...fallback.filter((n) => n !== 10)];

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

    const createPlayers = (
      side,
      formationStr,
      teamColor,
      keeperX,
      playerXCalc,
      usedSet,
      isRight
    ) => {
      const formation = formationStr.split("").map(Number);
      const totalRows = formation.length;
      const xstart = totalRows <= 3 ? 7 : 12;
      const ystart = 1.5;
      const xgap = (46 - 12) / totalRows;

      setplayers((prev) => [
        ...prev,
        {
          number: 1,
          color: getOpposingColor(teamColor),
          name: "",
          metadata: { type: "player", name: "player" },
          x: keeperX,
          y: 50,
        },
      ]);

      formation.forEach((count, rowIndex) => {
        const ygap = (100 - ystart * 2) / (count + 1);
        const isSecondLastRow = rowIndex === totalRows - 2;
        const isLastRow = rowIndex === totalRows - 1;
        const isOnlyStriker = isLastRow && count === 1;
        const isMidfieldSpecial = rowIndex !== 0 && rowIndex !== totalRows - 1 && count >= 4;

        for (let i = 0; i < count; i++) {
          const force10 = isSecondLastRow && ((isRight && i === 0) || (!isRight && i === count - 1));
          const number = getNumber(
            rowIndex,
            totalRows,
            usedSet,
            force10,
            isRight,
            isOnlyStriker,
            isMidfieldSpecial,
            i,
            count
          );

          const x = playerXCalc(xstart, rowIndex, xgap);
          const y = ystart + ygap * (i + 1);

          setplayers((prev) => [
            ...prev,
            {
              number,
              color: teamColor,
              name: "",
              metadata: { type: "player", name: "player" },
              x,
              y,
            },
          ]);
        }
      });
    };

    // LEFT
    if (value.left !== null) {
      createPlayers(
        "left",
        value.left,
        value.leftColor,
        12,
        (xstart, rowIndex, xgap) => xstart + (rowIndex + 1) * xgap,
        usedNumbersLeft,
        false
      );
    }

    // RIGHT
    if (value.right !== null) {
      createPlayers(
        "right",
        value.right,
        value.rightColor,
        88,
        (xstart, rowIndex, xgap) => 100 - (xstart + (rowIndex + 1) * xgap),
        usedNumbersRight,
        true
      );
    }
  };

  return { setformation };
};
