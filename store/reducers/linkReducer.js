import { GET_ALL_LİNKS } from "../linkConstants";

export default linkReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_LİNKS:
      return action.payload;

    default:
      return state;
  }
};
