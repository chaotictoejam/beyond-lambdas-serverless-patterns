#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AuthCognitoStack } from '../lib/auth-cognito-stack';

const app = new cdk.App();
new AuthCognitoStack(app, "AuthCognitoStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});