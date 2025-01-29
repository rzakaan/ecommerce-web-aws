export class UserDetail {
  person_id: string;
  name: string;
  email: string;
  createdAt: string;

  constructor(person_id: string, name: string, email: string) {
    this.person_id = person_id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date().toISOString();
  }

  static getTableName() {
    return "UserDetail";
  }
}