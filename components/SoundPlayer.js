import { Text, View, StyleSheet, Button } from 'react-native';
import { useState, useEffect } from "react";

import { Audio } from 'expo-av';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
});

export default function SoundPlayer() {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync( require('../assets/shaak/shaak-3.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}