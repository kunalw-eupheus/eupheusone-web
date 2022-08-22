import axios from "axios";

const instance = axios.create({
  baseURL: "https://nodecrmv2.herokuapp.com/api/",
});

export default instance;
