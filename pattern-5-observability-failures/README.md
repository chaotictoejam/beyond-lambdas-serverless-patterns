#  Pattern 5: Observability & Failure Handling

This example shows how to instrument Lambda functions using AWS Lambda Powertools and configure failure handling with DLQs + CloudWatch alarms.

---

## 🔍 Features

- Structured logs with `@aws-lambda-powertools/logger`
- Custom metrics with `metrics`
- Tracing with `tracer` (X-Ray supported)
- DLQ setup with alarm on failures
- Optional SQS → Lambda trigger

---

## 🚀 Deploy

```bash
npm install
npm run build
npx cdk bootstrap
npx cdk deploy
```
---

## 🧪 Trigger a Failure
1. Go to SQS Console → TriggerQueue

2. Send a message like:
```json
{ "shouldFail": true }
```

3. Check:
* Lambda logs (CloudWatch)
* DLQ (messages show up)
* Alarm triggers (optional: SNS alert)

# 🧠 Pattern Summary
* Add observability before things go wrong
* Always configure a DLQ or fallback
* Use metrics and alarms to know when things break

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
