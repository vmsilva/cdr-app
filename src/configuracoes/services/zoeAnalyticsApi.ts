import axios from 'axios';

const zoeAnalyticsApi = axios.create({
  baseURL: 'https://analytics.zoeplay.com.br/',
})

export default zoeAnalyticsApi;