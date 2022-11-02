import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Svg, { Rect } from "react-native-svg";

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
});

const Bar = (props) => {
  const value = props.n * 25;
  return <Rect x="100" y={props.i*5} width={value} height="5" fill="red" />;
};

const Bars = (props) => {
  const { graph } = props;
  const makeBars =
    graph &&
    graph.map((d, i) => {
      return <Bar key={i} n={d} i={i} />;
    });
  return (
    <Svg height="50%" width="100%" viewBox="0 0 200 200">
      {makeBars}
    </Svg>
  );
};

const ResetButton = ({ setGraph }) => {
  return (
    <Pressable onPress={() => setGraph([0])} style={styles.button}>
      <Text>Reset</Text>
    </Pressable>
  );
};

const DataDraw = (props) => {
  const { data } = props;
  const [graph, setGraph] = useState([0]);
  useEffect(() => {
    setGraph([...graph, data]);
  }, [data]);
  return (
    <View>
      <Bars graph={graph} />
      <View>
        <Text>{JSON.stringify(data)}</Text>
      </View>
      <ResetButton setGraph={setGraph} />
    </View>
  );
};

export default DataDraw;
