export interface DashLoginResponse {
  accessToken: string;
  refreshToken: string;
  session: {
    id: string;
    type: string;
    user: {
      id: string;
      name: string;
      email: string;
      picture: string;
    };
    access: string[];
    profiles: string[];
    subscription: {
      expiredAt: Date;
      features: {
        usageAmount: number;
        key: string;
        quantity: number;
      }[];
    }[];
  };
  grantType: string;
  iat: number;
  exp: number;
}
