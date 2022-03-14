import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const dimensions = Dimensions.get("screen");
export default function Search({ value, setValue }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Arama..."
        autoCapitalize="none"
        style={styles.input}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <FontAwesome
        name="search"
        size={24}
        color="#616161"
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: dimensions.width / 1.1,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
  },
  input: {
    borderWidth: 0.3,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#e6e6e6",
    width: dimensions.width / 1.2,
  },
  icon: {
    marginLeft: 6,
    marginTop: 5,
  },
});
