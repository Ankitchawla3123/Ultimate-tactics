export const useShape = (setlines, setpolygons) => {
  const UpdateShape = (shapeName, data, i) => {
    if (shapeName === "line") {
      setlines((prev) =>
        prev.map((line, index) => (index === i ? { ...line, ...data } : line))
      );
    } else if (shapeName === "polygon") {
      setpolygons((prev) =>
        prev.map((polygon, index) =>
          index === i ? { ...polygon, ...data } : polygon
        )
      );
    }
  };

  const DeleteShape = (shapeName, i) => {
    if (shapeName === "line") {
      setlines((prev) => prev.filter((_, index) => index !== i));
    } else if (shapeName === "polygon") {
      setpolygons((prev) => prev.filter((_, index) => index !== i));
    }
  };
  return { UpdateShape, DeleteShape };
};
