# Event-Driven Fan-Out with AWS EventBridge, Lambda, and SQS

This example demonstrates the **event-driven fan-out** pattern using AWS services. When an `OrderPlaced` event is emitted by a producer Lambda to Amazon EventBridge, the event is routed to three SQS queues (inventory, email, analytics). Each queue triggers a dedicated consumer Lambda, enabling parallel, decoupled processing.

## Architecture

- **Producer Lambda** emits `OrderPlaced` events to **EventBridge**
- **EventBridge Rule** routes all `OrderPlaced` events to three **SQS queues**
- **Three Consumer Lambdas** (inventory, email, analytics) are triggered by their respective SQS queues

```
Producer Lambda ──> EventBridge ──> [SQS: Inventory] ──> [Consumer: Inventory Lambda]
                                 └─> [SQS: Email]     ──> [Consumer: Email Lambda]
                                 └─> [SQS: Analytics] ──> [Consumer: Analytics Lambda]
```

## Deploy Instructions

1. Install dependencies:
   ```sh
   npm install
   ```
2. Deploy the stack:
   ```sh
   npx cdk deploy
   ```

## Triggering the Producer Lambda

You can manually invoke the producer Lambda from the AWS Console or CLI. Example test event:

```json
{
  "orderId": "12345"
}
```

This will emit an `OrderPlaced` event, which will be fanned out to all three SQS queues and processed by their respective consumer Lambdas.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
