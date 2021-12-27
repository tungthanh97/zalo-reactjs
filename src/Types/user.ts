import { BaseEntity } from 'Types';

export type User = BaseEntity & {
  email: string;
  password: string;

  username: string;
  avatar: string;
  date: number;
};

export type UserFormSignUp = {
  username: string;
  password: string;
  email: string;
};
