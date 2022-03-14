import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CircleLogo from "../components/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RegisterForm } from "../components/RegisterForm";

const dimensin = Dimensions.get("screen");
export function RegisterScreen({ navigation }) {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <CircleLogo />
      <Text style={styles.registerTitle}>Kayıt ol</Text>

      <RegisterForm navigation={navigation} />
      <View style={styles.loginContainer}>
        <Text style={{ fontSize: 16 }}>Hesabınız var mı ?</Text>
        <TouchableOpacity style={styles.btnContainer}>
          <Text
            style={styles.btnText}
            onPress={() => navigation.navigate("LOGIN")}
          >
            Giriş
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  loginContainer: {
    marginTop: dimensin.height / 15,
    flexDirection: "row",
  },
  btnContainer: {
    marginLeft: 5,
    backgroundColor: "rgb(0, 102, 0)",
    borderRadius: 10,
    height: dimensin.height / 45,
    width: dimensin.width / 7,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
  },
});
