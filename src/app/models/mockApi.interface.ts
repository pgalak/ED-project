import { User } from './user.interface';

export interface MockApi {
  items: User[];
  total: number;
}