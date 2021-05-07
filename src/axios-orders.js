import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-ae01d-default-rtdb.firebaseio.com/',
});

export default instance;
