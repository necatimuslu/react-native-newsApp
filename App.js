import { AuthProvider } from "./context/auth";
import AppNavigation from "./navgation";
import { NavigationContainer } from "@react-navigation/native";
import { LinkProvider } from "./context/link";
import { Provider } from "react-redux";
import store from "./store";
export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <AuthProvider>
            <LinkProvider>
              <AppNavigation />
            </LinkProvider>
          </AuthProvider>
        </NavigationContainer>
      </Provider>
    </>
  );
}
