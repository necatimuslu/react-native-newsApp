import { GET_ALL_LİNKS } from "../linkConstants";
import * as api from "../../services/linkService";

export const allLinks = () => async (dispatch) => {
  const { data } = await api.fetchAllLinks();

  dispatch({
    type: GET_ALL_LİNKS,
    payload: data,
  });
};
