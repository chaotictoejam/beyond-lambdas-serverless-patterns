#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ObservabilityFailuresStack } from "../lib/observability-failures-stack";

const app = new cdk.App();
new ObservabilityFailuresStack(app, "ObservabilityFailuresStack", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});