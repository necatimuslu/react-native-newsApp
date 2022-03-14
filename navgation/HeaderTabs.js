import { useContext } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../context/auth";
import { useNavigation } from "@react-navigation/native";
export default function HeaderTabs() {
  const navigation = useNavigation();
  const handlePopular = () => {
    navigation.navigate("POPULAR");
  };
  return (
    <SafeAreaView style={{ marginRight: 15 }}>
      <TouchableOpacity onPress={handlePopular}>
        <FontAwesome5 name="bell" size={25} color="#ff9900" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
