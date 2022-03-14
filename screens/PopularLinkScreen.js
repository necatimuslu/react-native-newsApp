import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";

import HomeLinkCard from "../components/HomeLinkCard";

import { getAllLinks, viewCountLinkUpdate } from "../services/linkService";

const dimension = Dimensions.get("screen");
const PopularLinkScreen = ({ navigation }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchAllLinks();
  }, []);

  const fetchAllLinks = async () => {
    await getAllLinks(setLinks);
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
      <ImageBackground
        style={styles.container}
        source={require("../assets/space.jpeg")}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              marginVertical: 15,
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Popüler Link Listesi
          </Text>
        </View>

        <LinkList
          links={
            links &&
            links.sort((a, b) => (a.views < b.views ? 1 : -1)).slice(0, 3)
          }
          handlePress={handlePress}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Son Eklenenler
          </Text>
        </View>

        <LinkList
          links={
            links &&
            links
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
              .slice(0, 3)
          }
          handlePress={handlePress}
        />
      </ImageBackground>
    </>
  );
};

const LinkList = ({ links, handlePress }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {links.map((list, i) => (
      <View style={{ marginTop: 5, marginBottom: 10, marginLeft: 15 }} key={i}>
        <HomeLinkCard {...list} handlePress={() => handlePress(list)} />
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: dimension.height,
    marginTop: 30,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5,
  },
});

export default PopularLinkScreen;
