import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export function HeaderActionBtn() {
  // const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="bell-alert-outline"
          size={24}
          color="orange"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 3,
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
});
