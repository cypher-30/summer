export const formatTimeMicro = (timeMs: number): string => {
  const milliseconds = Math.floor(timeMs) % 1000;
  const seconds = Math.floor(timeMs / 1000) % 60;
  const minutes = Math.floor(timeMs / 60000);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
};
