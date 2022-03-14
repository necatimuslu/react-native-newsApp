import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function CustomBottomNav() {
  const Tab = ({ icon, name }) => (
    <>
      <TouchableOpacity>
        <FontAwesome
          name={icon}
          size={25}
          style={{ marginBottom: 3, alignSelf: "center" }}
        />
        <Text style={{ alignSelf: "center" }}>{name}</Text>
      </TouchableOpacity>
    </>
  );
  return (
    <View style={styles.container}>
      <Tab name="Anasayfa" icon={"home"} />
      <Tab name="Gönderi" icon={"edit"} />
      <Tab name="Linkler" icon={"th-list"} />
      <Tab name="Hesap" icon={"user"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
    marginHorizontal: 20,
  },
});
