#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EventBridgeFanoutStack } from '../lib/eventbridge-fanout-stack';

const app = new cdk.App();

new EventBridgeFanoutStack(app, 'EventBridgeFanoutStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
