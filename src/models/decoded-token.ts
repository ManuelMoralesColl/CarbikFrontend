export interface DecodedToken {
  id: number;
  sub: string;
  exp: number;
  iat: number;
  [key: string]: any;
}