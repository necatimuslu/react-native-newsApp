import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CircleLogo from "../components/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { LoginForm } from "../components/LoginForm";

const dimensin = Dimensions.get("screen");
export function LoginScreen({ navigation, route }) {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <CircleLogo />
      <Text style={styles.registerTitle}>Giriş</Text>

      <LoginForm navigation={navigation} />
      <View style={styles.loginContainer}>
        <Text style={{ fontSize: 16 }}>Hesabınız yok mu ?</Text>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate("REGISTER")}
        >
          <Text style={styles.btnText}>Kayıt ol</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.forgotContainer}>
        <TouchableOpacity
          style={styles.btnContainer2}
          onPress={() => navigation.navigate("FORGOT")}
        >
          <Text style={{ color: "orange" }}>Şifre Yenile</Text>
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
    height: dimensin.height / 40,
    width: dimensin.width / 6,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
  },
  forgotContainer: {
    marginTop: dimensin.height / 55,
  },
  btnContainer2: {
    width: dimensin.width / 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
