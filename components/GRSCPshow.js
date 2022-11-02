import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gyroscope } from "expo-sensors";
import DataDraw from "./DataDraw";

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

export default function GRSCPshow() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  const _subscribe = () => {
    Gyroscope.setUpdateInterval(64);
    setSubscription(
      Gyroscope.addListener((GyroscopeData) => {
        setData(mapShallow(GyroscopeData));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "On" : "Off"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        x: {x} y: {y} z: {z}
      </Text>
      <DataDraw data={data}></DataDraw>
    </View>
  );
}

function round(n) {
  return Math.trunc(n * 100) / 100;
}

function mapShallow(obj) {
  const cleanData = {};
  Object.keys(obj).forEach((key) => {
    cleanData[key] = round(obj[key]);
  });
  return cleanData;
}
