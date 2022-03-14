import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { FontAwesome } from "@expo/vector-icons";
import PostScreen from "../screens/PostScreen";
import LinksScren from "../screens/LinksScreen";
import AccountScreen from "../screens/AccountScreen";
import { MaterialIcons } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderTabs from "./HeaderTabs";
import { HeaderBackBtn } from "../components/nav/HeaderBackBtn";
import { HeaderActionBtn } from "../components/nav/HeaderActionBtn";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Anasayfa"
        component={HomeScreen}
        options={{
          //headerShown: false,
          headerTitle: "NewsApp",
          tabBarIcon: () => (
            <FontAwesome name="home" size={24} color={"#333"} />
          ),
          headerRight: () => <HeaderTabs />,
          tabBarActiveTintColor: "#039BE5",
        }}
      />
      <Tab.Screen
        name="Post ekle"
        component={PostScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialIcons name="add-to-queue" size={28} color="#333" />
          ),

          tabBarActiveTintColor: "#039BE5",
        }}
      />
      <Tab.Screen
        name="Link İşlemler"
        component={LinksScren}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome name="list-ul" size={24} color="#333" />
          ),

          tabBarActiveTintColor: "#039BE5",
        }}
      />
      <Tab.Screen
        name="İşlemler"
        component={AccountScreen}
        options={{
          headerTitle: "Profil Detay",
          headerLeft: () => <HeaderBackBtn />,
          headerRight: () => <HeaderActionBtn />,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account-cog" size={24} color="#333" />
          ),

          tabBarActiveTintColor: "#039BE5",
        }}
      />
    </Tab.Navigator>
  );
}
