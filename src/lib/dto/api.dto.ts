interface ReqHeader {
  requestId: string;
  sessionId: string;
}

interface ResponseDTO<T> {
  status : number;
  code   : string;
  message: string;
  data   : T;
}

interface ReqLoginDTO {
  userId  : string;
  password: string;
}

interface ResLoginDTO {
  code : string;
  redirectUri: string;
  state: string;
}

interface ReqUserInfoDTO{}

interface ResUserInfoDTO{}