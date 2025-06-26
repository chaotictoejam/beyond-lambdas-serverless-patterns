# 🔁 Pattern 2: Step Functions Orchestration

This example demonstrates centralized orchestration using AWS Step Functions. It simulates an order processing workflow: validating the order, charging the customer, and sending a confirmation email.

## 🧰 Services Used

- AWS Step Functions (Express Workflow)
- AWS Lambda
- AWS CDK (TypeScript)

## 🚀 Deploy

```bash
npm install
npx cdk bootstrap
npx cdk deploy
```

## 🧪 Testing the Workflow

After deployment, go to the AWS Step Functions Console, locate the OrderProcessingStateMachine, and start a new execution with this input:

```json
{
  "orderId": "12345",
  "amount": 99.99
}
```

You should see each step execute in sequence and return a final combined result.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
