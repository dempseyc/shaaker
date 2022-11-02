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

const ActionButton = (props) => {
  { actionName, actionFn } = props;
  return (
    <Pressable onPress={actionFn} style={styles.button}>
      <Text>{actionName}</Text>
    </Pressable>
  );
};

const actions = [
  {
    actionName: "Start Rec. •",
    actionFN: () => {}
  },
  {
    actionName: "Stop Rec. ◘",
    actionFN: () => {}
  },
  {
    actionName: "Play Rec. ‣",
    actionFN: () => {}
  },
  {
    actionName: "Clear Rec. ○",
    actionFN: () => {}
  },
]

const Buttons = () => {
  const buttons = actions.map((action, i) => {
    return (
    <ActionButton  key={i} {...action}/>
    )
  });
  return (
    <>
      {buttons}
    </>
  );
}

const DataDraw = (props) => {
  const { data } = props;
  const [graph, setGraph] = useState([]);
  useEffect(() => {
    setGraph([...graph, data]);
  }, [data]);
  return (
    <View>
      <Bars graph={graph} />
      <View>
        <Text>{JSON.stringify(data)}</Text>
      </View>
      <Buttons />
    </View>
  );
};

export default DataDraw;
