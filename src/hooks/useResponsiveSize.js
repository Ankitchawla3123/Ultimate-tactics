import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { togglerotation, setshortscreen } from "../store/boardslice";

export const useResponsiveSize = () => {
  const [heightVh, setHeightVh] = useState(70);
  const [aspect, setAspect] = useState("16 / 10");
  const [playerNumberFontSize, setPlayerNumberFontSize] = useState(0);
  const dispatch = useDispatch();

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

    const pxHeight = (computedVh / 100) * H;
    const pxWidth = pxHeight * (aspectW / aspectH);

    const referenceSize = Math.min(pxWidth, pxHeight);
    const radius = 0.018 * referenceSize;

    const multiplier = aspectString === "16 / 10" ? 1.5 : 1;
    const fontSize = radius * multiplier;

    return {
      computedVh,
      aspectString,
      fontSize,
      innerHeight: H,
    };
  };

  const updateResponsiveData = () => {
    const { computedVh, aspectString, fontSize, innerHeight } =
      computeResponsiveSize();
    setHeightVh(computedVh);
    setAspect(aspectString);
    setPlayerNumberFontSize(fontSize);

    dispatch(togglerotation(aspectString));
    if (aspectString === "16 / 10" && innerHeight < 400) {
      dispatch(setshortscreen(true));
    } else {
      dispatch(setshortscreen(false));
    }
  };

  useEffect(() => {
    updateResponsiveData(); // initial run

    const handleResize = () => {
      updateResponsiveData();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return { heightVh, aspect, playerNumberFontSize };
};
