const PolicyType = {
  DASHBOARD_ACCESS: 0,
  REPORT_ACESS: 1,
};

export default class Policy {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static getTableName() {
    return "Policy";
  }
}
