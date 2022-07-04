import axios from "axios";

axios.defaults.baseURL = 'http://20.111.38.16/';
const accessToken = localStorage.getItem("refreshtoken");
let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;

        const response = await axios.get('auth/token/refresh', {headers: {
    
            Authorization : `Bearer ${accessToken}`
          }
        }, {withCredentials: false});

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['accesstoken']}`;
            // console.log(accessToken);
            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});