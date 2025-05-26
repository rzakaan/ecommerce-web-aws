export default class BaseModel {
  id: number;
  createdAt: string;
  updatedAt: string;

  constructor(id: number) {
    this.id = id;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
};