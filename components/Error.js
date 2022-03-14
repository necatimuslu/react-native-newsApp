import { View, Text, StyleSheet } from "react-native";
export default function Error({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    color: "red",
    padding: 5,
  },
});
