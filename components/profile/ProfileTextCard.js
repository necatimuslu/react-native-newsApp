import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileTextCard({ userProfile }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>E-mail: {userProfile?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
