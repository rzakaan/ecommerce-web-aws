export const RoleType = {
  ADMIN: 0,
  REGULAR: 1
};

export class Role {
  id: number;
  name: string;
  policies: number[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.policies = [];
  }

  static getTableName() {
    return "Role";
  }

  static toString(id: number): string {
    const match = Object.entries(RoleType).find(([_, value]) => value === id);
    return match ? match[0] : "UNKNOWN";
  }
};
