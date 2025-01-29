import {
  DynamoDBDocument,
  DynamoDBDocumentClient,
  GetCommand, PutCommand
} from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { UserDetail } from "./model/UserDetail";

export class DynmaoDbService {
  tableName: string;
  client: DynamoDBDocumentClient;
  constructor(tableName: string) {
    this.tableName = tableName;
    this.client = this.connect();
  }

  connect() {
    // dynamoDB client
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;
    const region = process.env.AWS_REGION;

    if (!accessKeyId || !secretAccessKey || !region) {
      throw new Error('AWS credentials or region are not set in environment variables');
    }

    const credentials = {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    };

    const config = {
      region: region,
      credentials: credentials
    };

    this.client = DynamoDBDocument.from(new DynamoDB(config));
    return this.client;
  }

  async getItems(partitionKey: number) {
    const params = {
      TableName: this.tableName,
      Key: {
        person_id: partitionKey
      }
    };

    try {
      const result = await this.client.send(new GetCommand(params));
      const item = result.Item;
      // console.log('GetItem succeeded:', JSON.stringify(item));

      return item || null;

    } catch (error: any) {
      console.error('Error getting item:', error.message);
      throw error;
    }
  }

  async putItem(item: UserDetail) {
    const params = {
      TableName: UserDetail.getTableName(),
      Item: item
    };

    try {
      await this.client.send(new PutCommand(params));
      console.log('Item added successfully');
    } catch (error: any) {
      console.error('Error putting item:', error.message);
      throw error;
    }
  }
}