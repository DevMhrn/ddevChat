import ENV from "./env";

export const BASE_URL = ENV.BACKEND_URL;
export const API_URL = BASE_URL + '/api';
export const AUTH_URL = API_URL + '/auth';
export const LOGIN_URL = AUTH_URL + '/login';
export const CHAT_GROUP_URL = API_URL + '/chat-group';

