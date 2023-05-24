import { createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "@root/utils/fetch";
import { useDispatch } from "react-redux";

const LOGIN_PATH = apiUrl("projects");
const ORIGIN = "http://localhost:3000";
const initialState = localStorage.getItem("user");

export const loginUser = async (data) => {
  const response = await fetch(LOGIN_PATH, {
    mode: "cors",
    method: "GET",
    headers: {
      Authorization: data,
      Accept: "application/json",
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": ORIGIN,
      Origin: ORIGIN,
    },
  });
  if (!response.ok) {
    return "Invalid login or password";
  }
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    logout(state) {
      localStorage.removeItem("user");
      return null;
    },
  },
});

const isAuthenticated = (state) => state.auth !== null;

const { login, logout } = auth.actions;

export { login, logout, isAuthenticated };
export default auth.reducer;
