import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import XLRMTRshow from "./components/XLRMTRshow";
import GRSCPshow from "./components/GRSCPshow";

export default function App() {
  return (
    <SafeAreaView style={styles.fullWidth}>
      <View style={styles.fullHeight}>
        <XLRMTRshow />
        {/* <GRSCPshow /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    flexDirection: "row",
    flex: 1,
  },
  fullHeight: {
    flexDirection: "column",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
});
