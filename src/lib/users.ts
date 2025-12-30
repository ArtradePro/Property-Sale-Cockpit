import usersData from '../../data/users.json';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export function getUsers(): User[] {
  return usersData;
}
