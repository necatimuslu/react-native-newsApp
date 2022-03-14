import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";

import { getData } from "../storage";

import { AuthContext } from "../context/auth";

import HomeLinkCard from "../components/HomeLinkCard";
import { Fontisto } from "@expo/vector-icons";
import {
  getAllLinks,
  viewCountLinkUpdate,
  countList,
  fetchAllLinksPageParams,
} from "../services/linkService";
import Search from "../components/Search";

const dimensions = Dimensions.get("screen");
const HomeScreen = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [count, setCount] = useState();
  const [page, setPage] = useState(1);
  async function setData() {
    let data = await getData("@user");
  }
  setData();

  useEffect(() => {
    fetchAllLinks();
  }, [page]);

  const fetchAllLinks = () => {
    fetchAllLinksPageParams(page)
      .then((res) => setLinks([...links, ...res.data]))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    countTotal();
  }, []);
  const countTotal = () => {
    countList()
      .then((res) => setCount(res.data.count))
      .catch((err) => console.log(err));
  };

  const handlePress = async (list) => {
    await viewCountLinkUpdate(list._id);
    navigation.navigate("LİSTVİEW", { list });
    setLinks(() => {
      const index = links.findIndex((l) => l._id == list._id);
      links[index] = { ...list, views: list.views + 1 };
      return [...links];
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Search value={searchKeyword} setValue={setSearchKeyword} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {links &&
            links
              .filter((x) =>
                x.title.toLowerCase().includes(searchKeyword.toLowerCase())
              )
              .map((list, i) => (
                <View style={{ marginTop: 5, marginBottom: 10 }} key={i}>
                  <HomeLinkCard
                    {...list}
                    handlePress={() => handlePress(list)}
                  />
                </View>
              ))}
          {/* {count > links?.length && ( */}
          <View style={styles.btnContainer}>
            <Pressable style={styles.presBtn} onPress={() => setPage(page + 1)}>
              <Fontisto name="more-v-a" size={16} color="#fff" />
              <Text style={styles.presText}>Daha fazla...</Text>
            </Pressable>
          </View>
          {/*  )} */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  presBtn: {
    width: dimensions.width / 1.1,
    height: dimensions.height / 25,
    borderWidth: 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#66BB6A",
  },
  presText: {
    marginLeft: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
