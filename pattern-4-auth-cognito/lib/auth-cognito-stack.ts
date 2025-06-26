import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as appsync from "aws-cdk-lib/aws-appsync";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export class AuthCognitoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Cognito User Pool
    const userPool = new cognito.UserPool(this, "UserPool", {
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: "Verify your email for our App!",
        emailBody: "Thanks for signing up! Your verification code is {####}",
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      signInAliases: { email: true },
    });

    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
      authFlows: {
        userPassword: true, // <-- Enables USER_PASSWORD_AUTH
      },
    });

    // AppSync API secured with Cognito
    const api = new appsync.GraphqlApi(this, "CognitoAppsyncApi", {
      name: "CognitoSecuredApi",
      definition: appsync.Definition.fromFile("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
      },
      xrayEnabled: true,
    });

    // Lambda for getMyProfile
    const profileLambda = new lambda.Function(this, "GetMyProfileLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("src/resolvers/getMyProfile"),
    });

    // Add resolver
    const lambdaDs = api.addLambdaDataSource("GetMyProfileDS", profileLambda);

    lambdaDs.createResolver('QueryGetMyProfile',{
      typeName: "Query",
      fieldName: "getMyProfile",
    });

    // Outputs
    new cdk.CfnOutput(this, "GraphQLAPIURL", { value: api.graphqlUrl });
    new cdk.CfnOutput(this, "UserPoolId", { value: userPool.userPoolId });
    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
  }
}