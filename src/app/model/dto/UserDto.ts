export class UserDto {
  name: string;
  email?: string;
  constructor(name: string) {
    this.name = name;
  }
}