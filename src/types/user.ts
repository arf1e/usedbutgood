export type JWTPairType = {
  access_token: string;
  refresh_token: string;
};

export interface LoginInterface {
  email: string;
  password: string;
}

export type UserType = {
  id: number;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  avatar: string;
};

export interface SignUpInteface {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: 'customer';
}
