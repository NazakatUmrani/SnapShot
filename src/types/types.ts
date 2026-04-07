import { type IconType } from 'react-icons';

export interface NavItem {
  name: string;
  link: string;
  icon: IconType;
}

export interface UserSignUp {
    email: string,
    password: string,
    confirmPassword: string
}

export interface UserLogin {
    email: string,
    password: string,
}