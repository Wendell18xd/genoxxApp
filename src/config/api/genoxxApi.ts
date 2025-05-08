import {API_URL_PROD, API_URL_DEV} from '@env';
import axios from 'axios';
import {StorageAdapter} from '../../presentation/adapter/storage-adapter';

export let API_URL = API_URL_PROD;

export const initApi = async () => {
  const host = await StorageAdapter.getItem('host');
  if (host) {
    API_URL = host;
  } else {
    await StorageAdapter.setItem('host', API_URL_PROD);
  }
  genoxxApi.defaults.baseURL = API_URL;
  console.log('API initialized with baseURL:', API_URL);
};

export const setApiHost = async (host: string) => {
  await StorageAdapter.setItem('host', host);
  API_URL = host;
  genoxxApi.defaults.baseURL = host;
};

export const toggleApiHost = async () => {
  const currentHost = await StorageAdapter.getItem('host');

  let newHost = API_URL_PROD;

  if (currentHost === API_URL_PROD) {
    newHost = API_URL_DEV;
  } else if (currentHost === API_URL_DEV) {
    newHost = API_URL_PROD;
  }

  await setApiHost(newHost);
  console.log('Toggled API host to:', newHost);
};

const genoxxApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log(genoxxApi.defaults.baseURL);

export {genoxxApi};
