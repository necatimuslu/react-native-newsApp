import React from "react";
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";

const dimensions = Dimensions.get("screen");
export default function PorfileImageCard({ userProfile }) {
  return (
    <View style={styles.container}>
      {userProfile?.image?.url ? (
        <Image
          style={styles.image}
          source={{
            uri: userProfile?.image?.url,
          }}
        />
      ) : (
        <Image
          style={styles.image}
          source={require("../../assets/profile.jpeg")}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 14,
    width: dimensions.width / 2,
    height: dimensions.height / 6,
    borderRadius: 15,
    marginTop: 7,
    backgroundColor: "#fff",
    shadowColor: "#333",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  image: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.4)",
    borderRadius: 150,
    width: dimensions.width / 2,
    height: dimensions.width / 2.8,
    borderRadius: 15,
  },
});
