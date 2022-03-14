import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const dimension = Dimensions.get("screen");
const CircleLogo = () => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: dimension.height / 7,
    width: dimension.width / 2,
    resizeMode: "contain",
  },
});

export default CircleLogo;
