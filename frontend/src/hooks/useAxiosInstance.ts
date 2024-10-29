import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const useAxiosInstance = () => {
  // 未ログインの場合はnullを返す
  const token = useAuthHeader();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      switch (error.response?.status) {
        case 401:
          // TODO:余裕がある場合は、リフレッシュトークンを使って再ログイン処理を書く
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;
