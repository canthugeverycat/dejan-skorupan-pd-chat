import { SOUNDS } from './const';
import { SoundConfig } from './types';

// We preload all sounds so we don't get a delay when playing
let preloadedSounds: { [key: string]: HTMLAudioElement } | null = null;

/**
 * Plays a selected sound effect
 *
 * @param {SoundConfig} config Config of the current sound
 */
export const playSoundEffect = (config: SoundConfig) => {
  const sound = new Audio(config.url);
  sound.currentTime = config.start || 0;

  sound.play();
};

/**
 * Preload all sounds effects from the config
 */
export const preloadAllSounds = () => {
  if (preloadedSounds) {
    return;
  }

  const data: { [key: string]: HTMLAudioElement } = {};

  for (const key in SOUNDS) {
    const soundKey = key as keyof typeof SOUNDS;
    const s = new Audio(SOUNDS[soundKey].url);
    s.preload = 'auto';

    s.load();

    data[soundKey] = s;
  }
};
