import { useState, useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import ogs from "@uehreka/open-graph-scraper-react-native";
import urlRegex from "url-regex";
import CardComponent from "../components/CardComponent";
import { createLink } from "../services/linkService";
const dimension = Dimensions.get("screen");
export default function PostScreen({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState();
  const [urlPreview, setUrlPriview] = useState({});
  const handleChange = async (text) => {
    try {
      setLink(text);
      if (urlRegex({ strict: false }).test(text)) {
        ogs({ url: text }, (error, results, response) => {
          if (results.success) {
            setUrlPriview(results);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (!link || !title) {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: `Başlık ve link zorunludur`,
      });
      return;
    }

    if (!urlPreview.success) {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: `Lütfen url adresini kontrol ediniz`,
      });

      return;
    } else {
      createLink({ url: link, title, urlPreview }, navigation, setLinks);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Toast position="bottom" bottomOffset={20} />
      <SafeAreaView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Web sitesi URL yapıştır</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Url ekle"
            value={link}
            autoCapitalize="none"
            autoComplete={false}
            onChangeText={(value) => handleChange(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Başlık ekle"
            autoCapitalize="sentences"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        {urlPreview.success && (
          <View style={{ marginBottom: 20 }}>
            <CardComponent {...urlPreview} />
          </View>
        )}
        <View style={styles.btnContainer}>
          <Pressable style={styles.pressableBtn} onPress={handleSubmit}>
            <Text style={styles.btnText}>Gönder</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
  },
  inputContainer: {
    width: dimension.width / 1.2,
    justifyContent: "center",
  },
  input: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.4)",
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 13,
    marginVertical: 10,
  },
  btnContainer: {
    marginHorizontal: 15,
    alignSelf: "center",
    marginTop: 10,
  },
  pressableBtn: {
    backgroundColor: "#009688",
    width: dimension.width / 1.3,
    justifyContent: "center",
    alignItems: "center",
    height: dimension.height / 20,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
