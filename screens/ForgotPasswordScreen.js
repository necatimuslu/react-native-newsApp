import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { forgotPassword, resetPassword } from "../services/auth/authService";
import { useState } from "react";
const dimension = Dimensions.get("screen");
const ForgotPasswordScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/forgot.png")} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Şifre Yenile</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 15, marginBottom: 10, marginLeft: 8 }}>
          Email
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email giriniz"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{ color: "red", marginLeft: 10, marginHorizontal: 5 }}>
            Email zorunludur.
          </Text>
        )}
        {visible && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Yeni Şifre giriniz"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Reset kod giriniz"
              value={resetCode}
              onChangeText={(text) => setResetCode(text)}
            />
          </>
        )}
      </View>
      {visible ? (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.inputBtn}
            onPress={handleSubmit(async (data) => {
              try {
                await resetPassword({ email: data.email, password, resetCode });
                navigation.navigate("LOGIN");
              } catch (error) {
                console.log(error);
              }
            })}
          >
            <Text style={styles.inputText}>Şifre Güncelle</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.inputBtn}
            onPress={handleSubmit((data) => {
              console.log(data.email);
              forgotPassword({ email: data.email }, setVisible);
            })}
          >
            <Text style={styles.inputText}>Gönder</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.loginContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("LOGIN")}>
          <Text style={{ fontSize: 15, color: "#1976D2" }}>Giriş</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: dimension.width / 1.5,
    height: dimension.height / 5,
    resizeMode: "contain",
  },
  inputContainer: {
    marginVertical: 10,
    width: dimension.width / 1.3,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: dimension.width / 1.3,
  },
  inputBtn: {
    backgroundColor: "#FF5722",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  inputText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  loginContainer: {
    marginVertical: 15,
  },
  titleContainer: {
    marginVertical: 15,
  },
});

export default ForgotPasswordScreen;
