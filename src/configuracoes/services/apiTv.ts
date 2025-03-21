import axios from 'axios';

const base_url = 'https://api3.goveduca.com.br';

const apiTv = axios.create({
  baseURL: base_url,
});


export default  apiTv;