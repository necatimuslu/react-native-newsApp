import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { getUserById } from "../services/auth/authService";
import { useSelector, useDispatch } from "react-redux";
import LinkCardDetail from "../components/LinkCardDetail";
import { allLinks } from "../store/action/linkAction";
import { AuthContext } from "../context/auth";
export default function LinksScren() {
  const [state, setState] = useContext(AuthContext);
  const [userLinks, setUserLinks] = useState([]);
  const [allLink, setAllLink] = useState([]);
  console.log(allLink);
  console.log(userLinks);
  /*  const dispatch = useDispatch(); reducer kullanarak ürünleri listeleme */
  useEffect(() => {
    /*  fetchAllLinks(); reducer kullanarak ürünleri listeleme */
    fetchUserLinkById();
    fetchAllLinks();
  }, []);
  /*  const fetchAllLinks = () => {
    dispatch(allLinks());  reducer kullanarak ürünleri listeleme
  }; */
  const fetchUserLinkById = () => {
    getUserById(state?.user?._id)
      .then((res) => {
        setUserLinks(res.links);
      })
      .catch((err) => console.log(err));
  };
  const fetchAllLinks = () => {
    getUserById(state?.user?._id)
      .then((res) => {
        setAllLink(res.getUserById);
      })
      .catch((err) => console.log(err));
  };
  /* const { links } = useSelector((state) => ({ ...state }));   reducer kullanarak ürünleri listeleme */

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Link Listeleri</Text>
      </View>
      <FlatList
        data={userLinks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <LinkCardDetail item={item} fetchAllLinks={fetchAllLinks} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
