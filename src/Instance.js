import axios from "axios";

const instance = axios.create({
 
   baseURL: "https://stageapi.eupheusapp.com/api/",
});

export default instance;
