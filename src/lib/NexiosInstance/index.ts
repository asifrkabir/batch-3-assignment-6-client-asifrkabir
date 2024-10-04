import envConfig from "@/config/envConfig";
import { Nexios } from "nexios-http";
import { cookies } from "next/headers";

const nexiosInstance = new Nexios({
  baseURL: envConfig.baseApi,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

nexiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config!.headers!.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default nexiosInstance;
