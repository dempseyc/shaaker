import { Audio } from "expo-av";

const soundObjects = [];

class Player {
  static load(library) {
    try {
      const promisedSoundObjects = [];
      library.forEach((file, index) => {
        soundObjects[index] = new Audio.Sound();
        promisedSoundObjects.push(soundObjects[index].loadAsync(file,
          {shouldPlay: true}));
      });
      console.log("load");
      return promisedSoundObjects;
    } catch (error) {
      console.warn(error, "load");
    }
  }

  static unload() {
    try {
      soundObjects.forEach(async (sound) => await sound.unloadAsync());
      console.log("unload");
    } catch (error) {
      console.warn(error, "unload");
    }
  }
  // note, audiosound object has a .volume and .setVolumeAsync(volume) returns promise
  static playSound(index) {
    try {
      if (soundObjects[index]) {
        soundObjects[index].replayAsync();
        // console.log("play");
      }
    } catch (error) {
      console.warn(error, "play");
    }
  }
}

export default Player;
