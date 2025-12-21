import axios from "axios";
// const Base_Url="http://192.168.0.4:5000/api";
const Base_Url="http://192.168.0.7:5000/api";
// const BASE_URL="https://api.arinnovate.io/api";

const Api = axios.create({
 baseURL: Base_Url,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;