export const API_BASE_URL = '/api/v1';
export const API_TIMEOUT = 5000;

export const API_INFO = {
  GET_PERMISSION: `${API_BASE_URL}/permission`,
  POST_LOGIN: `${API_BASE_URL}/login`,

  GET_ACCESS_TOKEN: `${API_BASE_URL}/token/create`,
  GET_VALID_TOKEN: `${API_BASE_URL}/token/check`,
  DELETE_TOKEN: `${API_BASE_URL}/token/delete`,

  POST_USER: `${API_BASE_URL}/user/create`,
  GET_USER: `${API_BASE_URL}/user/inquiry`
};

export interface ApiResponse<T> {
  code   : string;
  message: string;
  status : number;
  type   : string;
  data   : T;
}

export interface ApiReqHeader {
  contentType: string;
  authorization: string; // Base <clientKey>:<clientSecret>
  token: string;
}

export interface GetUserReqQuery {
  userId: string;
  operation: Array<{

  }>
}