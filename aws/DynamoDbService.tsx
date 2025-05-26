import {
  DynamoDBDocument,
  DynamoDBDocumentClient,
  GetCommand, PutCommand
} from '@aws-sdk/lib-dynamodb';
import { DynamoDB, QueryCommand } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { UserDetail } from "./model/UserDetail";

export class DynmaoDbService {
  tableName: string;
  client!: DynamoDBDocumentClient;
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  connect() {
    const config = {
      region: process.env.AWS_REGION
    };
    this.client = DynamoDBDocument.from(new DynamoDB(config));
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

  async getItem(partitionKey: number) {
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

  async getItems(partitionKey: number) {
    const toDate = new Date('2024-05-01'); // your lower bound
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const fromStr = toDate.toISOString();
    const toStr = yesterday.toISOString();

    const params = {
      TableName: this.tableName,
      FilterExpression: 'creation_date BETWEEN :from AND :to',
      ExpressionAttributeValues: {
        ':from': fromStr,
        ':to': toStr,
      },
    };

    try {
      const result = await this.client.send(new ScanCommand(params));
      const item = result.Items;
      console.log('GetItem succeeded:', JSON.stringify(item));
      return item || null;

    } catch (error: any) {
      console.error('Error getting item:', error.message);
      throw error;
    }
  }
}