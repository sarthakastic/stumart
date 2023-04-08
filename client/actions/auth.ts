import * as api from "@/api";

export const signin =
  (formData: any, history: any) => async (dispatch: any) => {
    try {
      const { data } = await api.signin(formData);
      dispatch({ type: "AUTH", data });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

export const signup =
  (formData: any, history: any) => async (dispatch: any) => {
    try {
      const { data } = await api.signup(formData);
      dispatch({ type: "AUTH", data });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
