import axios from "axios";
import { baseUrl } from "./common/baseUrl";
import Toast from "react-native-toast-message";

export const fetchAllLinks = async () => await axios.get(`/link/getAllLink`);

export const fetchAllLinksPageParams = async (page) =>
  await axios.get(`/link/getAllLink/${page}`);

export const createLink = async (linkForm, navigation, setLinks) => {
  try {
    const { data } = await axios.post(`${baseUrl}/link/create`, linkForm);

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
      await setLinks(data);
      setTimeout(() => {
        navigation.navigate("HOME");
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllLinks = async (setLinks) => {
  try {
    const { data } = await axios.get(`/link/getAllLink`);
    if (data.error) {
      return Toast.show({
        type: "error",
        text1: "Hata",
        text2: `${data.error}`,
      });
    } else {
      setLinks(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const viewCountLinkUpdate = async (linkId) =>
  await axios.put(`/link/view-update/${linkId}`, {});

export const likeLink = async (linkId) => {
  const { data } = await axios.put(`/link/like-update`, linkId);

  return data;
};

export const unLikeLink = async (linkId) =>
  await axios.put(`/link/unlike-update`, linkId);

export const countList = async () => await axios.get(`/link/get/total`);

export const deleteLink = async (linkId) => {
  try {
    const { data } = await axios.delete(`/link/delete/${linkId}`);

    if (data.error) {
      return Toast.show({
        type: "error",
        text1: "Hata",
        text2: `${data.error}`,
      });
    } else {
      return Toast.show({
        type: "success",
        text1: "Başarılı",
        text2: `${data.title}  silindi`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
