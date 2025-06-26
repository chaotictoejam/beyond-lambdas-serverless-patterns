"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBridgeFanoutStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const events = __importStar(require("aws-cdk-lib/aws-events"));
const eventsTargets = __importStar(require("aws-cdk-lib/aws-events-targets"));
const sqs = __importStar(require("aws-cdk-lib/aws-sqs"));
const lambdaEventSources = __importStar(require("aws-cdk-lib/aws-lambda-event-sources"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
class EventBridgeFanoutStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Producer Lambda
        const producerLambda = new lambda.Function(this, 'ProducerLambda', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('src/producer-lambda'),
            environment: {
                EVENT_BUS_NAME: 'default',
            },
        });
        // EventBridge permissions
        producerLambda.addToRolePolicy(new iam.PolicyStatement({
            actions: ['events:PutEvents'],
            resources: ['*'],
        }));
        // Create queues and consumer Lambdas
        const services = ['inventory', 'email', 'analytics'];
        for (const service of services) {
            const queue = new sqs.Queue(this, `${service}Queue`);
            const consumerLambda = new lambda.Function(this, `${service}ConsumerLambda`, {
                runtime: lambda.Runtime.NODEJS_18_X,
                handler: 'index.handler',
                code: lambda.Code.fromAsset(`src/consumer-lambdas/${service}`),
            });
            // Connect consumer to queue
            consumerLambda.addEventSource(new lambdaEventSources.SqsEventSource(queue));
            // Add queue as EventBridge target
            const rule = new events.Rule(this, `${service}Rule`, {
                eventPattern: {
                    source: ['myapp.orders'],
                    detailType: ['OrderPlaced'],
                },
            });
            rule.addTarget(new eventsTargets.SqsQueue(queue));
        }
    }
}
exports.EventBridgeFanoutStack = EventBridgeFanoutStack;
