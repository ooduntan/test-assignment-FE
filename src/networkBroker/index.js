import axios from 'axios';

export function apiRequest (data, method, url) {
  return axios({ method, url, data });
}
