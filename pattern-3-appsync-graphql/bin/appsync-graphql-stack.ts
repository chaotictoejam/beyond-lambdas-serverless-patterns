#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AppsyncGraphqlStack } from '../lib/appsync-graphql-stack';

const app = new cdk.App();
new AppsyncGraphqlStack(app, 'AppsyncGraphqlStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});