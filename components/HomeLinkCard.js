import { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import { likeLink, unLikeLink } from "../services/linkService";
import { useNavigation } from "@react-navigation/native";
const dimensions = Dimensions.get("screen");
export default function HomeLinkCard(props) {
  const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);
  const navigation = useNavigation();
  const handleLike = async (list) => {
    console.log(list);
    const data = await likeLink({ linkId: list._id });

    setLinks(() => {
      const index = links.findIndex((l) => l._id == list._id);
      data.postedBy = state.user;
      links[index] = data;
      return [...links];
    });
  };
  const handleunLike = async (list) => {
    const data = await unLikeLink({ linkId: list._id });
    setLinks(() => {
      const index = links.findIndex((l) => l._id == list._id);
      data.postedBy = state.user;
      links[index] = data;
      return [...links];
    });
  };

  /*  const imageData = (ogImage) => {
    if(ogImage.url){
      return ogImage.url
    }else if (ogImage?.length > 0){
      return ogImage[0].url;
    }else {
      return '';
    }
  } */
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.handlePress(props)}>
        <View>
          <Image
            source={{ uri: props?.urlPreview?.ogImage?.url }}
            style={styles.image}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            top: -140,
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <TouchableOpacity onPress={() => handleLike(props)}>
            <FontAwesome name="heart" size={24} color="orange" />
            <Text
              style={{ marginLeft: 8, marginTop: 2, flexDirection: "column" }}
            >
              {props?.likes?.length}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "column" }}>
            <FontAwesome5 name="eye" size={24} color="orange" />
            <Text style={{ marginLeft: 10 }}>{props?.views}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <FontAwesome5 name="clock" size={24} color="orange" />
            <Text style={{ marginLeft: -18, marginTop: 5 }}>
              {moment(props?.createdAt).format("MM-DD-YYYY")}
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PROFILE", {
                  name: props?.postedBy?.name,
                  _id: props?.postedBy?._id,
                })
              }
            >
              <FontAwesome name="user" size={24} color="orange" />
              <Text style={{ marginLeft: -8, marginTop: 5 }}>
                {props?.postedBy?.name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{props?.urlPreview?.ogTitle}</Text>
          <Text style={styles.textTitle2}>
            {props?.urlPreview?.ogDescription}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: dimensions.width / 1.1,
    height: dimensions.height / 2.5,
    borderRadius: 14,
    backgroundColor: "#fff",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: dimensions.width / 1.1,
    height: dimensions.height / 5.5,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
  },
  textContainer: {
    height: 96,
    padding: 5,
    marginTop: 8,
  },
  textTitle: {
    padding: 5,
    marginBottom: 5,
  },
  textTitle2: {
    padding: 4,
    marginBottom: 2,
  },
});
