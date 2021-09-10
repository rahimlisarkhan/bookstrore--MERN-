import axios from 'axios'

const baseURL = '/api/';

export const Axios = axios.create({
  baseURL,
  timeout: 60000,
});
