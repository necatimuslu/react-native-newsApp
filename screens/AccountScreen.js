import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { getData, removeData, setData } from "../storage";
import { resetPassword } from "../services/auth/authService";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
const dimensions = Dimensions.get("screen");

export default function AccountScreen() {
  const [state, setState] = useContext(AuthContext);
  const [password, setPassword] = useState();

  const [uploadImage, setUploadImage] = useState("");
  const [image, setImage] = useState({
    url: "",
    public_id: "",
  });

  useEffect(() => {
    const { image, name, email, role } = state.user;
    setImage(image);
  }, [state]);
  const { name, email } = state.user;

  const handleUploadImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log("Camera access required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (pickerResult.cancelled === true) {
      return;
    }
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;

    setUploadImage(base64Image);

    const { data } = await axios.post("/user/image-upload", {
      image: base64Image,
    });

    let userData = await getData("@user");
    userData.user = data;
    await setData("@user", userData);
    setState({ ...state, user: data });

    setImage(data.image);
    if (data.image != null) {
      Toast.show({
        type: "success",
        text1: "Başarılı",
        text2: "Resim  Yüklendi 👋",
      });
    }
  };

  const handleResetPassword = async () => {
    if (!password || password.lenght > 6) {
      return;
    }
    await resetPassword({ email, password })
      .then(() => setPassword(""))
      .catch((err) => console.log(err));
  };
  const handleLogout = async () => {
    setState({
      user: null,
      token: "",
    });
    await removeData("@user");
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Toast position="bottom" bottomOffset={40} />
      <View style={styles.avatarCircle}>
        {image && image.url ? (
          <Image source={{ uri: image.url }} style={styles.image} />
        ) : uploadImage ? (
          <Image source={{ uri: uploadImage }} style={styles.image} />
        ) : (
          <Avatar
            style={styles.image}
            source={require("../assets/profile.jpeg")}
          />
        )}
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleUploadImage}>
          <FontAwesome name="camera" size={24} color="#FFC107" />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={{ marginBottom: 10, fontSize: 15 }}>Şifre yenile</Text>
        <TextInput
          style={styles.input}
          placeholder="Yeni şifrenizi giriniz..."
          value={password}
          onChangeText={(text) => setPassword(text)}
          passwordRules
          secureTextEntry={true}
        />
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.pressableBtn} onPress={handleResetPassword}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Şifre Güncelle
          </Text>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.pressableBtn2} onPress={handleLogout}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Çıkış
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    marginTop: 5,
    marginBottom: 5,
    width: dimensions.width / 2.6,
    height: dimensions.height / 4.6,
    resizeMode: "cover",
    borderRadius: 40,
  },
  avatarCircle: {
    alignItems: "center",
    width: dimensions.width / 2,
    height: dimensions.height / 4,
    borderWidth: 10,
    borderColor: "#fff",
    borderRadius: dimensions.width / 7,
  },
  textContainer: {
    marginTop: dimensions.height / 35,
    alignItems: "center",
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
  },
  email: {
    fontSize: 24,
    color: "grey",
  },
  inputContainer: {
    marginTop: dimensions.height / 50,
    alignItems: "flex-start",
  },
  input: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    width: dimensions.width / 1.3,
    height: dimensions.height / 20,
    padding: 7,
  },
  btnContainer: {
    marginTop: dimensions.height / 50,
    alignItems: "flex-start",
  },
  pressableBtn: {
    backgroundColor: "#FB8C00",
    width: dimensions.width / 1.3,
    height: dimensions.height / 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  pressableBtn2: {
    backgroundColor: "#D84315",
    width: dimensions.width / 1.3,
    height: dimensions.height / 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  imageContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
