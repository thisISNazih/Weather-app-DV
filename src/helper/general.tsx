export const convertUnixToTime = (unixValue: number) => {
  let time = new Date(unixValue * 1000);
  return time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
