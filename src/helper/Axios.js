import axios from 'axios';

export const baseURL = 'http://localhost:8000/';

export default axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': ['application/json;multipart/form-dasta;'],
  },
});
