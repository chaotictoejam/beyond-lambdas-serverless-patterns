#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StepfunctionsOrchestrationStack } from '../lib/stepfunctions-orchestration-stack';

const app = new cdk.App();
new StepfunctionsOrchestrationStack(app, 'StepfunctionsOrchestrationStack');