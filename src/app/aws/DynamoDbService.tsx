import {
  DynamoDBDocument,
  DynamoDBDocumentClient,
  GetCommand, PutCommand
} from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { UserDetail } from "./model/UserDetail";
import { SecretsManagerClient, GetSecretValueCommand, } from "@aws-sdk/client-secrets-manager";

export class DynmaoDbService {
  tableName: string;
  client!: DynamoDBDocumentClient;
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async getCredentials(key: string) {
    const client = new SecretsManagerClient({
      region: "eu-central-1",
    });

    let response;
    try {
      response = await client.send(
        new GetSecretValueCommand({
          SecretId: key,
        })
      );
    } catch (error) {
      throw error;
    }

    const credentials = JSON.parse(response.SecretString || '{}');
    console.log(credentials);
    return {
      accessKeyId: credentials.dynamo_access_key,
      secretAccessKey: credentials.dynamo_secret_key,
    };
  }

  async connect() {
    const dynamo_cred = await this.getCredentials("dynamo_credentials");
    if (!dynamo_cred) {
      throw new Error('AWS credentials or region are not set in environment variables');
    }
    const config = {
      region: process.env.AWS_REGION,
      credentials: dynamo_cred
    };

    this.client = DynamoDBDocument.from(new DynamoDB(config));
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