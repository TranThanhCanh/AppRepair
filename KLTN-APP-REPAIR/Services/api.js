import axios from 'axios';

export default axios.create({
   //baseURL: `http://192.168.1.5:45455/api/`
  baseURL: `http://192.168.1.2:45455/api/`
  //baseURL: `http://localhost:56179/api/`
  
});