import { useContext } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { deleteLink } from "../services/linkService";
import Toast from "react-native-toast-message";
import { AuthContext } from "../context/auth";
const dimensions = Dimensions.get("screen");
export default function LinkCardDetail({ item, fetchAllLinks }) {
  const [state, setState] = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Toast position="bottom" bottomOffset={40} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>
          <Text style={{ fontWeight: "600" }}>Link Adı :</Text>
          {item?.title}
        </Text>
        {
          state?.user?._id && (
            <Pressable
              style={styles.presBtn}
              onPress={() => {
                deleteLink(item._id)
                  .then(() => {
                    Toast.show({
                      type: "success",
                      text1: "Başarılı",
                      text2: `Link  silindi`,
                    });
                    fetchAllLinks();
                  })
                  .catch((err) => {
                    Toast.show({
                      type: "error",
                      text1: "Hata",
                      text2: `${err.message}`,
                    });
                  });
              }}
            >
              <Text style={{ color: "#fff" }}>Sil</Text>
            </Pressable>
          ) /* : (
          <View style={styles.noRole}>
            <Text style={{ color: "#fff" }}>Yetki yok</Text>
          </View>
        ) */
        }
      </View>

      <Text>
        <Text style={{ fontWeight: "600" }}>Link Url :</Text>
        {item?.urlPreview?.ogUrl}
      </Text>
      <Text>
        <Text style={{ fontWeight: "600" }}>Oluşturan :</Text>
        {item?.postedBy?.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: dimensions.width / 1.1,
    borderWidth: 0.3,
    marginLeft: 10,
    padding: 10,
    marginBottom: 8,
    borderRadius: 15,
  },
  presBtn: {
    marginRight: 8,
    borderWidth: 0.3,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "red",
    borderRadius: 10,
    width: dimensions.width / 13,
    height: dimensions.height / 40,
    justifyContent: "center",
    alignItems: "center",
  },
  noRole: {
    marginRight: 8,
    borderWidth: 0.3,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "green",
    borderRadius: 10,
    width: dimensions.width / 6,
    height: dimensions.height / 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
