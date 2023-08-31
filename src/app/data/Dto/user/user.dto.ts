export interface UserDto {
  _id?: string;

  username: string;

  profileURL: string;

  email: string;

  password: string;

  role: string;

  createdAt?: Date;
}
