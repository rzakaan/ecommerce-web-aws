import { Image, Card, CardBody, CardHeader } from '@heroui/react';
import { DynmaoDbService } from '@/app/aws/DynamoDbService'
import Avatar from '@/app/components/Avatar';

export default async function getInitialData() {
  let dynamodDb = new DynmaoDbService('Person');
  const items = await dynamodDb.getItems(2);
  const json = JSON.parse(JSON.stringify(items));

  return (
    Avatar(json)
  )
}