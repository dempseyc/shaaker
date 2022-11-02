import { Text, View, StyleSheet, Button } from "react-native";
import { useState, useEffect, useRef } from "react";
import Player from "./SoundLibraryPlayer";
import soundLibrary from "./soundLibrary";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
});

export default function SoundPlayer(props) {
  const deltaThresh = 0.5;
  const { data } = props;
  const prevData = useRef({ F: 0, D: 0 });
  const [ready, setReady] = useState(false);
  const [next, setNext] = useState(4);
  const prevDataSign = prevData.current.F >= 0;
  const newDataSign = data.F >= 0;
  const signFlip = prevDataSign ^ newDataSign;
  const lastTime = useRef(Date.now());

  const loadSounds = () => {
    const sounds = Player.load(soundLibrary);
    Promise.all(sounds)
      .then(() => {
        setReady(true);
      })
      .catch((error) => console.log(error));
  };

  const play = (index) => {
    if (ready) {
      Player.playSound(index);
    }
  };

  useEffect(() => {
    return () => Player.unload();
  }, []);

  useEffect(() => {
    if (!ready) {
      loadSounds();
    }
  }, [ready]);

  const watchForce = (data) => {
    if (signFlip) {
      // check timing with current calibration
      const now = Date.now();
      console.log(now - lastTime.current);
      lastTime.current = now;

      play(next);
      // using 2 different samples helps not stop&restart
      next - 1 < 3 ? setNext(4) : setNext(next - 1);
    }
    prevData.current = data;
  };

  useEffect(() => {
    // debounce
    if (Math.abs(data.D) > deltaThresh) {
      watchForce(data);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Button title="Play 0" onPress={() => play(0)} />
      <Button title="Play 2" onPress={() => play(2)} />
      <Button title="Play 4" onPress={() => play(4)} />
    </View>
  );
}
