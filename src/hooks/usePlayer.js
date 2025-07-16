import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getPointerPosition } from "../utils/getPointerPosition";

export const usePlayer = (boardref) => {
  const ref = boardref.current;
  const [players, setplayers] = useState([]);
  const dragging = useSelector((state) => state.moveable.dragging);
  const aspect = useSelector((state) => state.board.aspect);

  useEffect(() => {
    setplayers((prev) =>
      prev.map((item) => {
        if (!item.aspect || item.aspect === aspect) return item;

        return {
          ...item,
          x: aspect === "10 / 16" ? 100 - item.y : item.y,
          y: aspect === "10 / 16" ? item.x : 100 - item.x,

          aspect,
        };
      })
    );
  }, [aspect]);

  const addplayer = (e, data) => {
    const { x, y } = getPointerPosition(e, boardref);
    const player = {
      ...data,
      x: x,
      y: y,
      aspect: aspect,
    };
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

  const emptplayerref = useRef(false);
  useEffect(() => {
    const handleWindowLoad = () => {
      const storedPlayers = localStorage.getItem("players");
      if (storedPlayers === "[]") {
        emptplayerref.current = true;
      }

      if (storedPlayers) {
        try {
          setplayers(JSON.parse(storedPlayers));
        } catch (e) {
          console.error("Failed to parse polygons from localStorage", e);
        }
      }
    };

    if (document.readyState === "complete") {
      handleWindowLoad();
    } else {
      window.addEventListener("load", handleWindowLoad);
      return () => window.removeEventListener("load", handleWindowLoad);
    }
  }, []);

  useEffect(() => {
    if (emptplayerref.current) {
      localStorage.setItem("players", JSON.stringify(players));
    }
    if (!emptplayerref.current) {
      emptplayerref.current = true;
    }
  }, [players]);

  return { players, setplayers, addplayer, UpdatePlayer, DeletePlayer };
};
