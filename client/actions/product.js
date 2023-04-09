import * as api from "../api";

export const createProduct = (product, history) => async (dispatch) => {
  try {
    const { data } = api.createProduct(product);
    history.push("/");
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
