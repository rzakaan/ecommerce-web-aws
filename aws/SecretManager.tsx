import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export default class SecretManager {
  async getCredentials(key: string) {
    const client = new SecretsManagerClient({
      region: process.env.AWS_REGION,
    });

    let response;

    try {
      response = await client.send(
        new GetSecretValueCommand({
          SecretId: key,
        }),
      );
    } catch (error) {
      throw error;
    }

    const credentials = JSON.parse(response.SecretString || "{}");

    console.log(credentials);

    return {
      accessKeyId: credentials.access_key,
      secretAccessKey: credentials.secret_key,
    };
  }
}
