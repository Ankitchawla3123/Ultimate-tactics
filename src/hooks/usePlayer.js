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
    // console.log(player)
    setplayers((prev) => [...prev, player]);
  };
  const UpdatePlayer = (data, i) => {
    setplayers((prev) =>
      prev.map((player, index) =>
        index === i ? { ...player, ...data } : player
      )
    );
  };
  const DeletePlayer = (i) => {
    setplayers((prev) => prev.filter((_, index) => index !== i));
  };

  return { players, setplayers, addplayer, UpdatePlayer, DeletePlayer };
};
