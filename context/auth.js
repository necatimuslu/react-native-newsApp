import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { getData, removeData } from "../storage";
import { baseUrl } from "../services/common/baseUrl";
import { useNavigation } from "@react-navigation/native";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = baseUrl;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      let res = error.response;
      console.log(res);
      if (res.status == 401 && res.config && !res.config.__isRetryRequest) {
        removeData("@user");
        setState({ user: null, token: "" });
        navigation.navigate("LOGIN");
      }
    }
  );

  useEffect(() => {
    const loadStorage = async () => {
      let data = await getData("@user");
      if (data != null) {
        setState({ ...state, user: data.user, token: data.token });
      } else {
        setState({
          user: null,
          token: "",
        });
      }
    };

    loadStorage();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
