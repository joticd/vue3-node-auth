import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";

export function useApi() {
   
        axiosInstance.interceptors.request.use(config => {
            const authStore = useAuthStore();
            const { accessToken } = storeToRefs(authStore);
            if(accessToken.value) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        });
        
        axiosInstance.interceptors.response.use(
            response => response,
            async error => {
                const authStore = useAuthStore();
                const prevRequest = error.config;
                if((error.response.status === 401 && error.response.status === 403) && !prevRequest.sent) {
                    prevRequest.sent = true;
                    await authStore.refreshAccessToken();
                    prevRequest.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
                    return axiosInstance;
                }
                return Promise.reject(error);
            }
        );

    return axiosInstance;
}



