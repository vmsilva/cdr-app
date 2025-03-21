import axios from 'axios';

const versionapi = axios.create({
  baseURL: 'https://versions.zoeplay.com.br/',
})

export default versionapi;//51.161.119.176