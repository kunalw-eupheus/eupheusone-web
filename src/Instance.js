import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.eupheusapp.com/api/',
  // baseURL: "http://ec2-3-7-84-212.ap-south-1.compute.amazonaws.com:6070/api/",
})

export default instance
