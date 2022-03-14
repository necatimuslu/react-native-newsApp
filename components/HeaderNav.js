import { useContext } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/auth";
import { removeData } from "../storage";

const diemension = Dimensions.get("screen");
const HeaderNav = () => {
  const [state, setState] = useContext(AuthContext);
  const handleLogout = async () => {
    setState({
      user: null,
      token: "",
    });
    await removeData("@user");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>NewsApp</Text>
      <TouchableOpacity style={styles.exitBtn} onPress={handleLogout}>
        <Text style={styles.btnText}>Çıkış</Text>
        <Ionicons
          style={{ marginLeft: 10, marginRight: 10 }}
          name="ios-exit-outline"
          size={30}
          color="#D84315"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: diemension.height / 8,
    width: diemension.width,
    backgroundColor: "#00695C",
    justifyContent: "space-between",
  },
  text: {
    marginTop: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  exitBtn: {
    position: "relative",
    left: 150,
    bottom: 35,
    flexDirection: "row",
  },
  btnText: {
    paddingTop: 7,
    color: "#fff",
    fontSize: 14,
  },
});

export default HeaderNav;
