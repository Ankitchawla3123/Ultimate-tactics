import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setcolor } from "../../../store/boardslice";

function ColorInput() {
  const currentColor = useSelector((state) => state.board.color);
  const isShortScreen = useSelector((state) => state.board.shortscreen); // <-- selector for short screen
  const dispatch = useDispatch();

  const [localColor, setLocalColor] = useState(currentColor);

  const onColorChange = (e) => {
    setLocalColor(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localColor !== currentColor) {
        dispatch(setcolor(localColor));
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localColor, dispatch, currentColor]);

  return (
    <input
      type="color"
      value={localColor}
      onChange={onColorChange}
      className={`relative h-6 lg:h-9 ${
        isShortScreen ? "w-7" : "w-12"
      } border-2 border-black rounded cursor-pointer`}
    />
  );
}

export default ColorInput;
