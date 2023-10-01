import { Role } from '../../../data/enum/role';

export interface SignUpDto {
  Email: string;
  UserName: string;
  Password: string;
  ProfileImage: FormData;
  confirmPassword: string;
  Role: Role;
}
