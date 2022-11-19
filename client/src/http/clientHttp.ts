import axios from "axios";

const $axiosClient = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_LOCAL_URL
})

$axiosClient.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/refresh`, { withCredentials: true })
                localStorage.setItem('user', JSON.stringify(response.data.user))
                return $axiosClient.request(originalRequest);
            } catch (e) {
                console.log(e, 'Error after refresh query')
                localStorage.removeItem('user');
                window.location.replace(process.env.REACT_APP_LOCAL_URL || '')
            }
            return $axiosClient.request(originalRequest);
        }
        throw error;
    }
)

export default $axiosClient;