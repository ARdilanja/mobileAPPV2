import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    console.log('isTokenExpiredtoken', token)
    if (!token) return true;
    const decoded = jwtDecode(token);
    console.log('decoded', decoded)
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};
