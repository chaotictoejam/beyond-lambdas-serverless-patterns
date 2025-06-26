# Pattern 3: GraphQL API Composition with AppSync

This example shows how to compose backend services using AWS AppSync and GraphQL. The `getUser` query pulls from DynamoDB, while `placeOrder` mutation is handled by a Lambda.

## 📐 Architecture

- **AppSync** – GraphQL API layer
- **DynamoDB** – User data source
- **Lambda** – Handles order logic
- **API Key Auth** – For simplicity

## 🚀 Deploy

```bash
npm install
npx cdk bootstrap
npx cdk deploy
```

## 🧪 Test in AppSync Console
Query:

```graphql
query {
  getUser(id: "abc123") {
    name
    email
  }
}
```

Mutation:

```graphql
mutation {
  placeOrder(userId: "abc123", total: 59.99) {
    id
    status
    total
  }
}
```

## 🧠 Pattern Summary
Use AppSync when:
* You need to stitch together multiple services behind one endpoint
* You want real-time subscriptions
* You want to eliminate REST over-fetching

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
