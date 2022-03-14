import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import { registerUser } from "../services/auth/authService";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

const dimension = Dimensions.get("screen");
export function RegisterForm({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    registerUser(data, navigation, setState);
  };
  return (
    <>
      <Toast position="bottom" bottomOffset={40} />
      <View style={styles.inputContainer}>
        <Text style={{ marginBottom: 5 }}>Kullanıcı adı</Text>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.registerInput}
              placeholder="Kullanıcı adı giriniz"
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              autoCorrect={false}
            />
          )}
        />
        {errors && errors.name && (
          <Text style={styles.errorText}>Kullanıcı adı zorunludur</Text>
        )}
        <Text style={{ marginBottom: 5 }}>Email </Text>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.registerInput}
              placeholder="Email giriniz"
              onChangeText={onChange}
              value={value}
              autoComplete="email"
              keyboardType="email-address"
            />
          )}
        />
        {errors && errors.name && (
          <Text style={styles.errorText}>Email zorunludur</Text>
        )}

        <Text style={{ marginBottom: 5 }}>Şifre </Text>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.registerInput}
              placeholder="Şifre giriniz"
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              autoComplete="password"
            />
          )}
        />
        {errors && errors.name && (
          <Text style={styles.errorText}>Şifre zorunludur</Text>
        )}
      </View>
      <View style={styles.registerButton}>
        <Pressable onPress={handleSubmit(onSubmit)} style={styles.pressableBtn}>
          <Text style={styles.btnText}>Kayıt ol</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    padding: 10,
  },
  registerInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    padding: 10,
    marginBottom: 10,
    width: dimension.width / 1.3,
  },
  registerButton: {
    marginTop: 5,
  },
  pressableBtn: {
    width: dimension.width / 2.5,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    height: dimension.height / 25,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    color: "#fff",
  },
  errorText: {
    marginTop: 3,
    marginBottom: 5,
    color: "red",
  },
});
