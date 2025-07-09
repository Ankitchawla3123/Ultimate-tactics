import { useState } from "react";

export const useFormation = ({ addplayer }) => {
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
    const formation = formation.map((val) => parseInt(val));
    const length = formation.length;
    const xgap = 5.5;
    const ygap = 9.78;
  };
};
