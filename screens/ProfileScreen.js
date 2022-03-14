import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import PorfileImageCard from "../components/profile/ProfileImageCard";
import ProfileLinkList from "../components/profile/ProfileLinkList";
import ProfileTextCard from "../components/profile/ProfileTextCard";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import { getUserById } from "../services/auth/authService";
const dimension = Dimensions.get("screen");
export default function ProfileScreen(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const [link, setLink] = useContext(LinkContext);

  const [userProfile, setUserProfile] = useState({});
  const [linkUser, setLinkUser] = useState([]);

  useEffect(() => {
    fethUserById();
  }, []);
  const fethUserById = () => {
    getUserById(props?.route?.params?._id)
      .then((res) => {
        setUserProfile(res.getUserById);
        setLinkUser(res.links);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/wp.jpeg")}
        style={{
          width: dimension.width,
          height: dimension.height,
        }}
      >
        <SafeAreaView>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <PorfileImageCard userProfile={userProfile} />
            </View>

            <ProfileTextCard userProfile={userProfile} />
            <ProfileLinkList
              linkUser={linkUser}
              setLinkUser={setLinkUser}
              fethUserById={fethUserById}
            />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
