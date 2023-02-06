export interface AuthToken {
  access_token: string;
  expirationDate: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}
