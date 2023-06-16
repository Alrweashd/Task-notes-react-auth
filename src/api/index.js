import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-react-auth.herokuapp.com/api",
  // baseURL: "http://localhost:5000/api",
});

export default instance;
