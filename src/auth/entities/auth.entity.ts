import { User } from '@/user/entities/user.entity';

export class Auth {
  user: Record<string, User>;
  token: string;
}
