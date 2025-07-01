export const getPointerPosition = (event, ref) => {
  const svg = ref.current;
  if (!svg) return { x: 0, y: 0 };

  let clientX, clientY;

  if (event.type.startsWith("touch")) {
    const touch = event.touches[0] || event.changedTouches?.[0];
    if (!touch) return { x: 0, y: 0 }; // safety fallback
    clientX = touch.clientX;
    clientY = touch.clientY;
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  const { left, top, width, height } = svg.getBoundingClientRect();
  const x = ((clientX - left) / width) * 100;
  const y = ((clientY - top) / height) * 100;

  return { x, y };
};
