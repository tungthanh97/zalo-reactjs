import { BaseEntity } from 'Types';

export type User = BaseEntity & {
  phone: string;
  password: string;

  username: string;
  avatar: string;
  date: number;
};

export type UserFormRegister = {
  username: string;
  password: string;
  phone: string;
};
