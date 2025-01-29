import { Image, Card, CardBody, CardHeader } from '@heroui/react';

export default function Avatar(json: any) {
  // json is user detail object

  return (
    <div className='flex flex-col items-center pt-5'>
      <Card className='border border-b-purple-300 rounded-xl'>
        <CardHeader className='flex-col items-start pb-0 pt-2 px-4 '>
          <p className='text-sm uppercase font-bold'>{json.name}</p>
          <small className='text-gray-500'>{json.email}</small>
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
