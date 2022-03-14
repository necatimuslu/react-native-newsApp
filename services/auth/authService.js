import axios from "axios";
import { baseUrl } from "../common/baseUrl";
import Toast from "react-native-toast-message";
import { setData } from "../../storage";

export const registerUser = async (userForm, navigation, setState) => {
  try {
    const { data } = await axios.post(`/user/register`, userForm);

    if (data.error) {
      return Toast.show({
        type: "error",
        text1: "Hata",
        text2: `${data.error}`,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Başarılı",
        text2: "Kayıt  başarılı 👋",
      });
      setTimeout(() => {
        navigation.navigate("HOME");
        storageData(data);
      }, 1000);

      async function storageData(veri) {
        let user = await setData("@user", veri);
        await setState(user);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (userForm) =>
  await axios.post(`${baseUrl}/user/login`, userForm);

export const resetPassword = async (userForm) => {
  try {
    const { data } = await axios.post(`/user/reset-password`, userForm);
    console.log(data.ok);
    if (data.ok === true) {
      return Toast.show({
        type: "info",
        text1: "Başarılı",
        text2: "Şifreniz başarıyla değiştirildi",
      });
    } else {
      return Toast.show({
        type: "error",
        text1: "Hata",
        text2: `${data.error}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async ({ email }, setVisible) => {
  try {
    const { data } = await axios.post("/user/forgot-password", { email });

    if (data.ok === true) {
      setVisible(true);
      return Toast.show({
        type: "info",
        text1: "Başarılı",
        text2: `Yenileme kodu ${data.email} adresine gönderildi `,
      });
    } else {
      return Toast.show({
        type: "error",
        text1: "Hata",
        text2: `${data.error}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (userId) => {
  try {
    const { data } = await axios.get(`/user/profile/${userId}`);
    if (data.error) {
      return Toast.show({
        type: "error",
        text1: "Hata",
        text2: `${data.error}`,
      });
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const userLink = async (userId) => {
  try {
    const { data } = await axios.post(`/link/get/userLink`, userId);
    if (data.error) {
      return Toast.show({
        type: "error",
        text1: "Hata",
        text2: `${data.error}`,
      });
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
