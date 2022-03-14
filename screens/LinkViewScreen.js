import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function ListViewScreen({ route }) {
  const [webLink, setWebLink] = useState("");
  console.log(route.params);

  function linkUrl() {
    return setWebLink(route.params.list.urlPreview.ogUrl);
  }

  useEffect(() => {
    linkUrl();
    if (webLink.includes("http || https")) {
      setWebLink(webLink);
    }
  }, [webLink]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView startInLoadingState source={{ uri: webLink }} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
