import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getPointerPosition } from "../utils/getPointerPosition";

export const useExtras = (boardref) => {
  const ref = boardref.current;
  const [extra, setextra] = useState(() => {
    try {
      const stored = localStorage.getItem("extra");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const dragging = useSelector((state) => state.moveable.dragging);
  const aspect = useSelector((state) => state.board.aspect);
  const aspectref = useRef(aspect);

  useEffect(()=>{
    aspectref.current=aspect
  },[aspect])



  useEffect(() => {
    setextra((prev) =>
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

  const addextra = (e, data) => {
    const { x, y } = getPointerPosition(e, boardref);
    const player = {
      ...data,
      x: x,
      y: y,
      aspect: aspectref.current,
    };
    setextra((prev) => [...prev, player]);
  };

 

  const DeleteExtra = (i) => {
    setextra((prev) => prev.filter((_, index) => index !== i));
  };

  const empItemsref = useRef(false);
  useEffect(() => {
    const handleWindowLoad = () => {
      const storedItems = localStorage.getItem("extra");
      if (storedItems === "[]") {
        empItemsref.current = true;
      }

      if (storedItems) {
        try {
          setextra(JSON.parse(storedPlayers));
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
    if (empItemsref.current) {
      localStorage.setItem("extra", JSON.stringify(extra));
    }
    if (!empItemsref.current) {
      empItemsref.current = true;
    }
  }, [extra]);

  return { extra, setextra, addextra, DeleteExtra };
};
