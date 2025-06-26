# Beyond Lambdas: Modern Serverless Design Patterns on AWS

Welcome! This repo contains hands-on examples and reference implementations for modern serverless patterns using AWS. It complements the talk "**Beyond Lambdas**" and shows how to build resilient, scalable, and observable applications using services like EventBridge, Step Functions, AppSync, Cognito, and more.

## Patterns Covered

1. [Event-Driven Decoupling](./pattern-1-eventbridge-fanout/)
2. [Orchestration vs. Choreography](./pattern-2-orchestration-vs-choreography/)
3. [API Composition with AppSync](./pattern-3-appsync-graphql/)
4. [Modern Auth with Cognito](./pattern-4-auth-cognito/)
5. [Observability & Failure Handling](./pattern-5-observability-failures/)
6. [Full System Example](./full-system-example/)

## 🧰 Tools Used

- AWS Lambda, EventBridge, SQS, Step Functions
- AWS AppSync (GraphQL)
- Amazon Cognito
- Amazon DynamoDB
- AWS CloudWatch, X-Ray, Lambda Powertools
- CDK or SAM for deployment

## 🎯 How to Use

Each pattern is self-contained with its own instructions. You can deploy them individually or combine them into the [full-system-example](./full-system-example/).
