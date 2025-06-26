import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as logs from "aws-cdk-lib/aws-logs";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import * as cloudwatch_actions from "aws-cdk-lib/aws-cloudwatch-actions";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subscriptions from "aws-cdk-lib/aws-sns-subscriptions";
import * as lambda_event_sources from "aws-cdk-lib/aws-lambda-event-sources";
import * as path from "path";

export class ObservabilityFailuresStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dlq = new sqs.Queue(this, "FailureDLQ");

    const lambdaFn = new lambda.Function(this, "ObservedLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("src/observed-lambda"),
      logRetention: logs.RetentionDays.ONE_WEEK,
      environment: {
        POWERTOOLS_SERVICE_NAME: "observability-demo",
        POWERTOOLS_METRICS_NAMESPACE: "ServerlessPatterns",
      },
      deadLetterQueue: dlq,
      deadLetterQueueEnabled: true,
      retryAttempts: 1,
      timeout: cdk.Duration.seconds(3),
    });

    // Optional trigger: send test events via SQS
    const testQueue = new sqs.Queue(this, "TriggerQueue");
    lambdaFn.addEventSource(new lambda_event_sources.SqsEventSource(testQueue));

    // Alarm: DLQ has messages
    const dlqAlarm = new cloudwatch.Alarm(this, "DLQAlarm", {
      metric: dlq.metricApproximateNumberOfMessagesVisible(),
      threshold: 1,
      evaluationPeriods: 1,
      alarmDescription: "Messages are piling up in the DLQ",
    });

    // Notify via SNS
    const topic = new sns.Topic(this, "AlarmTopic");
    dlqAlarm.addAlarmAction(new cloudwatch_actions.SnsAction(topic));

    // (Optional) Add email subscriber
    // topic.addSubscription(new subscriptions.EmailSubscription('you@example.com'));

    new cdk.CfnOutput(this, "TestQueueURL", { value: testQueue.queueUrl });
  }
}