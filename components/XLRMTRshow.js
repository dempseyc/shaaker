import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import DataDraw from "./DataDraw";
import SoundPlayer from "./SoundPlayer2";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "#eaeaea",
  },
  button: {
    backgroundColor: "#bbbbbb",
    borderWidth: 4,
    borderColor: "#444444",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    color: "#20232a",
    textAlign: "center",
    fontSize: 24,
  },
  text: {
    backgroundColor: "#61fbda",
    color: "#2a2a20",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function XLRMTRshow() {
  const timeInterval = 50;
  const prevX = useRef(null);
  const [data, setData] = useState({ F: 0, D: 0 });
  const [subscription, setSubscription] = useState(null);

  const _handleNewValue = (newValue) => {
    const x = round(newValue.x);
    const delta = round(x - prevX.current);
    prevX.current = x;
    if ( Math.abs(delta) > 0.7 ) {
      setData({F: x, D: delta });
    }
  }

  const _subscribe = () => {
    console.log("subscribe")
    Accelerometer.setUpdateInterval(timeInterval);
    setSubscription(
      Accelerometer.addListener(_handleNewValue)
    )
  };

  const _unsubscribe = () => {
    console.log("unsubscribe")
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "On" : "Off"}</Text>
        </Pressable>
      </View>
      <Text style={styles.text}>
        x: {data.F}
      </Text>
      <DataDraw data={data.F}></DataDraw>
      <SoundPlayer data={data}/>
    </View>
  );
}

function round(n) {
  return Math.trunc(n * 100) / 100;
}

// function mapShallow(obj, fn) {
//   const cleanData = {};
//   Object.keys(obj).forEach((key) => {
//     cleanData[key] = fn(obj[key]);
//   });
//   return cleanData;
// }
