import {defineStore} from "pinia";
// import axios from "axios";
import { useApi } from "../API/useApi";


export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
      accessToken: null,
      refreshToken: null
    }
  },

  getters: {
    userDetail: (state) => state.user,
    isAuthenticated: (state) => state.accessToken ? true : false
  },

  actions:{
    async register(payload) {
      console.log("STORE REGISTER", payload);
      try {
        const response = await useApi().post('/api/auth/register', payload);
        console.log("store register", response)
        this.accessToken = response.data.access_token;
        this.refreshToken = response.data.refresh_token;
        this.user = response.data.user;
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refreshToken);
      } catch(error) {
        console.log(error);
        throw error;
      }
    },

    async login(payload) {
      console.log("STORE LOGIN", payload);
      try {
        const response = await useApi().post('/api/auth/login', payload);
        console.log("store login", response)
        this.accessToken = response.data.access_token;
        this.refreshToken = response.data.refresh_token;
        this.user = response.data.user;
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refreshToken);
      } catch(error) {
        console.log(error);
        throw error;
      }
    },

    async refreshAccessToken(payload) {
      console.log("STORE REFRESH", payload)
      try {
        const response = await useApi().post('/api/auth/refresh');
        this.accessToken = response.data.access_token;
        localStorage("accessToken", this.accessToken);
      } catch(error) {
        console.log(error);
        throw error;
      }      
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },

    loadTokens() {
      this.accessToken = localStorage.getItem('accessToken');
      this.refreshToken = localStorage.getItem('refreshToken');
    }

  }
})