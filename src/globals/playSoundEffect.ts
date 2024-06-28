/**
 * Plays a selected sound effect
 *
 * @param   {string}  url  URL of the sound
 */
export const playSoundEffect = (url: string) => {
  const sound = new Audio(url);

  sound.play();
};
