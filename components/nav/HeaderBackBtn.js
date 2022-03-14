import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export function HeaderBackBtn() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.container}>
        <Ionicons
          style={{ marginLeft: 5 }}
          name="arrow-back"
          size={26}
          color="#1976D2"
        />
        <Text style={{ marginLeft: 2, color: "#1976D2", fontSize: 15 }}>
          Geri
        </Text>
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
});
