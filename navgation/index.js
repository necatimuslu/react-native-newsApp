import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "./BottomTabNavigation";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { AuthContext } from "../context/auth";
import HomeScreen from "../screens/HomeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ListViewScreen from "../screens/LinkViewScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PopularLinkScreen from "../screens/PopularLinkScreen";
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [state, setState] = useContext(AuthContext);

  const authenticated = state && state.token !== "" && state.user !== null;
  console.log("AUTH ------ >", authenticated);
  return (
    <>
      <Stack.Navigator initialRouteName="ROOT">
        {authenticated && authenticated ? (
          <>
            <Stack.Screen
              name="HOME"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="LİSTVİEW" component={ListViewScreen} />
            <Stack.Screen
              name="PROFILE"
              component={ProfileScreen}
              options={({ route }) => ({
                title: route.params.name,
                headerTransparent: true,
                headerBackTitle: "",
              })}
            />
            <Stack.Screen
              name="POPULAR"
              component={PopularLinkScreen}
              options={({ route }) => ({
                headerTransparent: true,
                headerBackTitle: "",
                title: "",
              })}
            />
            <Stack.Screen
              name="ROOT"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LOGIN"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="REGISTER"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FORGOT"
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default AppNavigation;
