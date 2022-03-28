import api from "../apiService/api";

export function token(authData) {
  const { email, password } = authData;
  try {
    return api.post("/auth", { email, password });
  } catch (error) {
    return {};
  }
}
export function getToken() {
  return localStorage.getItem("token");
}

const auth = {
  token,
  getToken,
};

export default auth;
