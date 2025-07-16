import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { togglerotation } from "../store/boardslice";

export const useResponsiveSize = () => {
  const [heightVh, setHeightVh] = useState(70);
  const [aspect, setAspect] = useState("16 / 10");
  const [playerNumberFontSize, setPlayerNumberFontSize] = useState(0);
  const dispatch = useDispatch();

  const radius = 1.8;

  useEffect(() => {
    dispatch(togglerotation(aspect));
  }, [aspect]);

  const computeResponsiveSize = () => {
    const { innerWidth: W, innerHeight: H } = window;
    const isLandscape = W > H;
    const aspectW = isLandscape ? 16 : 10;
    const aspectH = isLandscape ? 10 : 16;
    const aspectString = `${aspectW} / ${aspectH}`;

    let computedVh = 70;
    while (computedVh > 40) {
      const pxHeight = (computedVh / 100) * H;
      const calculatedWidth = pxHeight * (aspectW / aspectH);
      if (calculatedWidth <= W) break;
      computedVh -= 1;
    }

    if (aspectString === "10 / 16") {
      computedVh = 68;
    }
    const viewportHeight = (computedVh / 100) * H;
    const multiplier = aspectString === "16 / 10" ? 1.5 : 0.9;
    const fontSize = (viewportHeight * radius * multiplier) / 100;

    return {
      computedVh,
      aspectString,
      fontSize,
    };
  };

  // ✅ Sync: Initialize once before first render
  const initial = computeResponsiveSize();
  useState(() => {
    setHeightVh(initial.computedVh);
    setAspect(initial.aspectString);
    setPlayerNumberFontSize(initial.fontSize);
  });

  // ✅ Async: Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const { computedVh, aspectString, fontSize } = computeResponsiveSize();
      setHeightVh(computedVh);
      setAspect(aspectString);
      setPlayerNumberFontSize(fontSize);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { heightVh, aspect, playerNumberFontSize };
};
