import axios from "axios";

const instance = axios.create({
  // baseURL: "https://api.eupheusapp.com/api/",
  baseURL: "https://stageapi.eupheusapp.com/api/",
  //   baseURL: "http://192.168.7.80:5070/api/",
  // baseURL: "http://192.168.7.55:5070/api/",
});

export default instance;
