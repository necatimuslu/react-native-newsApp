import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";

const dimension = Dimensions.get("screen");

const CardList = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.btnContainer}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Link Adı: </Text>
          {item?.urlPreview?.ogSiteName}
        </Text>
      </View>

      <Text style={{ marginTop: 5 }}>
        <Text style={{ fontWeight: "bold" }}>Link Url: </Text>
        {item?.urlPreview?.ogUrl}
      </Text>
      <Text style={{ marginTop: 5 }}>
        <Text style={{ fontWeight: "bold" }}>Toplam tıklanma: </Text>
        {item?.views}
      </Text>
    </View>
  );
};

const ProfileLinkList = ({ linkUser, fethUserById }) => {
  console.log(linkUser);
  return (
    <View style={styles.container}>
      <FlatList
        data={linkUser}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CardList item={item} fethUserById={fethUserById} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 15,
    height: dimension.height / 10,
    width: dimension.width / 1.1,
    marginVertical: 5,
    marginLeft: 10,
    padding: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  presBtn: {
    marginRight: 8,
    borderWidth: 0.3,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "red",
    borderRadius: 10,
    width: dimension.width / 13,
    height: dimension.height / 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileLinkList;
