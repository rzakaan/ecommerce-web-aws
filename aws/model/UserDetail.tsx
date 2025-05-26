export class UserDetail {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    roles: number[];

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = [];
        this.createdAt = new Date().toISOString();
    }

    static getTableName() {
        return "UserDetail";
    }

    static fill(o: Partial<UserDetail>): UserDetail {
        let u = new UserDetail(
            o.id ?? '',
            o.name ?? '',
            o.email ?? '',
        );
        u.roles ?? [];
        return u;
    }
}