import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";

import { Role, RoleType } from "@/aws/model/Role";
import { UserDetail } from "@/aws/model/UserDetail";
import DefaultLayout from "@/layouts/default";

export default function ProfilePage() {
  let user = new UserDetail("1", "Rıza", "rzakaan@gmail.com");

  user.roles.push(RoleType.ADMIN);

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center pt-5">
        <Card className="border border-b-purple-300 rounded-xl">
          <CardHeader className="flex-col items-start pb-0 pt-2 px-4 ">
            <p className="text-sm uppercase font-bold">{user.name}</p>
            <small className="text-gray-500">{user.email}</small>
            <small className="text-gray-500">
              {Role.toString(user.roles[0])}
            </small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={240}
            />
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
}
