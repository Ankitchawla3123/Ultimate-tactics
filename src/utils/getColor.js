import chroma from "chroma-js";
  
  
  const getNumberColor = (color) => {
    const luminance = chroma(color).luminance();
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  const getOuterRingColor = (innerColor) => {
    return chroma(innerColor).darken(1.5).hex();  
  };

  export {getOuterRingColor, getNumberColor}