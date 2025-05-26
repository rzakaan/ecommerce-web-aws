import { Image } from '@heroui/image';
import { Card, CardBody, CardHeader } from '@heroui/card';

import { UserDetail } from '../aws/model/UserDetail';
import { Role } from '@/aws/model/Role';

export function Avatar(user: UserDetail) {
    return (
        <div className='flex flex-col items-center pt-5'>
            <Card className='border border-b-purple-300 rounded-xl'>
                <CardHeader className='flex-col items-start pb-0 pt-2 px-4 '>
                    <p className='text-sm uppercase font-bold'>{user.name}</p>
                    <small className='text-gray-500'>{user.email}</small>
                    <small className='text-gray-500'>{Role.toString(user.roles[0])}</small>
                </CardHeader>
                <CardBody className='overflow-visible py-2'>
                    <Image className='object-cover rounded-xl'
                        src="https://heroui.com/images/hero-card-complete.jpeg"
                        alt="Card background" width={240} />
                </CardBody>
            </Card>
        </div>
    )
}
