import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";

const dimension = Dimensions.get("screen");
export default function CardComponent({ ogTitle, ogDescription, ogImage }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={ogImage && { uri: ogImage.url }} />
      <TouchableOpacity>
        <View
          style={{
            paddingTop: 5,
            height: 90,
            marginHorizontal: 7,
          }}
        >
          <Text
            style={{
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            {ogTitle}
          </Text>
          <Text>{ogDescription}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: dimension.width / 1.3,
    height: dimension.height / 2.5,
    borderRadius: 14,
    backgroundColor: "#fff",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 6,
  },
  image: {
    width: dimension.width / 1.3,
    height: dimension.height / 4.5,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
});
