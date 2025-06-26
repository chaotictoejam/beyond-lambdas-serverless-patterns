import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as logs from 'aws-cdk-lib/aws-logs';

export class StepfunctionsOrchestrationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const validateOrder = new lambda.Function(this, 'ValidateOrderLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src/validate-order'),
    });

    const chargeCustomer = new lambda.Function(this, 'ChargeCustomerLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src/charge-customer'),
    });

    const sendEmail = new lambda.Function(this, 'SendEmailLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src/send-email'),
    });

    // Step Functions tasks
    const validateTask = new tasks.LambdaInvoke(this, 'Validate Order', {
      lambdaFunction: validateOrder,
      outputPath: '$.Payload',
    });

    const chargeTask = new tasks.LambdaInvoke(this, 'Charge Customer', {
      lambdaFunction: chargeCustomer,
      outputPath: '$.Payload',
    });

    const emailTask = new tasks.LambdaInvoke(this, 'Send Confirmation Email', {
      lambdaFunction: sendEmail,
      outputPath: '$.Payload',
    });

    // Define workflow
    const workflow = validateTask
      .next(chargeTask)
      .next(emailTask);
      
    // Create a CloudWatch Log Group
    const logGroup = new logs.LogGroup(this, 'StepFnLogGroup', {
      retention: logs.RetentionDays.ONE_WEEK,
    });
    
    new stepfunctions.StateMachine(this, 'OrderProcessingStateMachine', {
      definition: workflow,
      stateMachineType: stepfunctions.StateMachineType.EXPRESS,
      logs: {
        destination: logGroup,
        level: stepfunctions.LogLevel.ALL, // capture all states
      },
    });
  }
}
