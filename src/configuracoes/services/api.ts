import axios from 'axios';

//const base_url = 'https://api.zoeflix.com.br/';
const base_url = 'https://app.goveduca.com.br'; 

const api = axios.create({
  baseURL: base_url,
});


export default  api;