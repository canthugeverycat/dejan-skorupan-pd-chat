export const playSoundEffect = (url: string) => {
  const sound = new Audio(url);

  sound.play();
};
