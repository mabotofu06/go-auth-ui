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
  userId : string;
  session: string;
  code : string;
  redirectUri: string;
}

interface ReqUserInfoDTO{}

interface ResUserInfoDTO{}