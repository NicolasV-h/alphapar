import * as axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage?.getItem('user_token')}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Header'] = 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept';
