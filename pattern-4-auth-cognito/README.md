# Pattern 4: Modern Auth with Cognito

This example demonstrates using **Amazon Cognito** for authentication and securing an **AppSync GraphQL API** using **user pool authorization**. The `getMyProfile` query uses JWT claims to return the current user.

## 🧱 Architecture

- Cognito User Pool + Client
- AppSync GraphQL API (User Pool auth)
- Lambda resolver for `getMyProfile`

## 🚀 Deploy

```bash
npm install
npx cdk bootstrap
npx cdk deploy
```

## 🧪 Test the API
1. Sign up a user via CLI or Hosted UI (enable in CDK if needed)
2. Authenticate to get an idToken
3. Use the token in a GraphQL request:

```bash
curl -X POST https://<api-id>.appsync-api.<region>.amazonaws.com/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: <your-idToken>" \
  -d '{"query": "query { getMyProfile { id email } }"}'
```

## 🧠 Pattern Summary
Use Cognito when you need:
* Federated identity (Google, Facebook, SAML)
* Multi-platform authentication
* Seamless integration with AppSync and API Gateway

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## How To Sign Up a User via AWS CLI
After you deploy your CDK stack, you'll have:
* `UserPoolId`
* `UserPoolClientId`

Sign up a user:

```bash
aws cognito-idp sign-up \
  --client-id <UserPoolClientId> \
  --username testuser@example.com \
  --password 'StrongP@ssw0rd123!' \
  --user-attributes Name=email,Value=testuser@example.com
```

Confirm the user (if email is verified manually):

```bash
aws cognito-idp admin-confirm-sign-up \
  --user-pool-id <UserPoolId> \
  --username testuser@example.com
```

⚠️ If you enabled email verification, the user will receive a code and you can instead use:

```bash
aws cognito-idp confirm-sign-up \
  --client-id <UserPoolClientId> \
  --username testuser@example.com \
  --confirmation-code <the-code-from-email>
```

Log in to get tokens:
```bash
aws cognito-idp initiate-auth \
  --auth-flow USER_PASSWORD_AUTH \
  --client-id <UserPoolClientId> \
  --auth-parameters USERNAME=testuser@example.com,PASSWORD='StrongP@ssw0rd123!'
```

This returns:
* `IdToken` – used as the Authorization header for AppSync
* `AccessToken`
* `RefreshToken`
