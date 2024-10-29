export interface Msg {
  message: string;
}

export interface Jwt {
  accessToken: string;
}

export interface User {
  id: number;
  user_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface JwtPayload {
  email: string;
  userId: number;
  iat: number;
  exp: number;
}
