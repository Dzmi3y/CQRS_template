interface AuthData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  error?: string;
}

export default AuthData;
