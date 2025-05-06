import {API_URL_PROD, STAGE, API_URL_DEV} from '@env';
import axios from 'axios';

export const API_URL = STAGE === 'prod' ? API_URL_PROD : API_URL_DEV;

const genoxxApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log(genoxxApi.defaults.baseURL);

export {genoxxApi};
