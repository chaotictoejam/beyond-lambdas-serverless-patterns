#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EventBridgeFanoutStack } from '../lib/eventbridge-fanout-stack';

const app = new cdk.App();
new EventBridgeFanoutStack(app, 'EventBridgeFanoutStack');