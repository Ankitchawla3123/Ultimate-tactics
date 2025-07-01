import { useState } from "react";
import { useSelector } from "react-redux";
import { getPointerPosition } from "../utils/getPointerPosition";

export const usePlayer = (boardref) => {
  const ref = boardref.current;
  const [players, setplayers] = useState([]);
  const dragging = useSelector((state) => state.moveable.dragging);

  const addplayer = (e, data) => {
    const { x, y } = getPointerPosition(e, boardref);
    const player = {
      ...data,
      x: x,
      y: y,
    };
    setplayers((prev) => [...prev, player]);
  };
  const UpdatePlayer = (data, i) => {
    setplayers(
      (prev) => prev,
      map((player, index) => {
        if (index == i) {
          return { ...player, ...data };
        }
        return player;
      })
    );
  };

  return { players, setplayers, addplayer, UpdatePlayer };
};
