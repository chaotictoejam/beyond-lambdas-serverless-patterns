import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as eventsTargets from 'aws-cdk-lib/aws-events-targets';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambdaNode from 'aws-cdk-lib/aws-lambda-nodejs';

export class EventBridgeFanoutStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Producer Lambda
    const producerLambda = new lambdaNode.NodejsFunction(this, 'ProducerLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src/producer-lambda'),
      environment: {
        EVENT_BUS_NAME: 'default',
      },
    });

    // EventBridge permissions
    producerLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['events:PutEvents'],
        resources: ['*'],
      })
    );

    // Create queues and consumer Lambdas
    const services = ['inventory', 'email', 'analytics'];

    for (const service of services) {
      const queue = new sqs.Queue(this, `${service}Queue`);

      const consumerLambda = new lambdaNode.NodejsFunction(this, `${service}ConsumerLambda`, {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset(`src/consumer-lambdas/${service}`),
      });

      // Connect consumer to queue
      consumerLambda.addEventSource(new lambdaEventSources.SqsEventSource(queue));

      // Add queue as EventBridge target
      const rule = new events.Rule(this, `${service}Rule`, {
        eventPattern: {
          source: ['custom.orders'],
          detailType: ['OrderPlaced'],
        },
      });

      rule.addTarget(new eventsTargets.SqsQueue(queue));
    }
  }
}
