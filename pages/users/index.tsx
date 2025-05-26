'use client';

import { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import "../../globals.css";
import { Role } from '@/aws/model/Role';
import { UserDetail } from '@/aws/model/UserDetail';
import { DynmaoDbService } from '@/aws/DynamoDbService';

const db = new DynmaoDbService('Person');
db.connect();

export default function UsersPage() {
  const [users, setUsers] = useState<UserDetail[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const item = await db.getItem(2);
      const user = UserDetail.fill(JSON.parse(JSON.stringify(item)));
      setUsers([user]);
    };

    fetchData();
  }, []);


  /*
  let dynamodDb = new DynmaoDbService('Person');
  dynamodDb.connect();
  const items = await dynamodDb.getItem(2);
  const user = UserDetail.fill(JSON.parse(JSON.stringify(items)));
  let users = [];
  users.push(user);
  console.log(users);
  const constUsers = useState<UserDetail[]>(users);
  */

  const handleChangeRole = (id: string) => {
    alert(`Change role for user ${id}`);
  };

  // <TableCell>{new Date(user.createdAt).toLocaleDateString()}</-TableCell>
  return (
    <div className='flex flex-col items-center pt-5'>
      <Table>
        <TableHeader>
          <TableColumn className="font-semibold">Name</TableColumn>
          <TableColumn className="font-semibold">Email</TableColumn>
          <TableColumn className="font-semibold">Created</TableColumn>
          <TableColumn className="font-semibold">Roles</TableColumn>
          <TableColumn className="font-semibold">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {
            users.map((user: UserDetail) => (
              <TableRow>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>{Role.toString(user.roles[0])}</TableCell>
                <TableCell className="space-x-2">
                  <Button color='secondary' onClick={() => handleChangeRole(user.person_id)}>
                    Change Role
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}