import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
    baseURL: URL
});

const axiosPrivate = axios.create({
    baseURL: URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

class GenericAPI {
  get = async <T>(url: string, params?: AxiosRequestConfig["params"], headers?: AxiosRequestConfig["headers"], options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    
    return axiosInstance.get<T>(`${URL}${url}`, { ...options, headers, params:params });
  };

  post = async <T>(
    url: string,
    data: unknown,
    headers?: AxiosRequestConfig["headers"],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.post<T>(`${URL}${url}`, data, { ...options, headers });
  };

  put = async <T>(
    url: string,
    data: unknown,
    headers?: AxiosRequestConfig["headers"],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.put<T>(`${URL}${url}`, data, { ...options, headers });
  };

  delete = async <T>(url: string, headers?: AxiosRequestConfig["headers"], options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return axiosInstance.delete<T>(`${URL}${url}`, { ...options, headers });
  };

  // This method uses the private axios instance for requests
  privatePost = async <T>(
    url: string,
    data: unknown,
    headers?: AxiosRequestConfig["headers"],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosPrivate.post<T>(`${URL}${url}`, data, { ...options, headers });
  };
}

export const genericAPI = new GenericAPI();
