export const getPointerPosition = (event, ref) => {
  const svg = ref.current;
  if (!svg) return { x: 0, y: 0 };

  const { clientX, clientY } = event.type.startsWith("touch")
    ? event.touches[0]
    : event;

  const { left, top, width, height } = svg.getBoundingClientRect();
  const x = ((clientX - left) / width) * 100;
  const y = ((clientY - top) / height) * 100;


  return { x, y };
};
