"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_eventbridge_1 = require("@aws-sdk/client-eventbridge");
const client = new client_eventbridge_1.EventBridgeClient({});
exports.handler = async (event) => {
    const orderId = event.orderId || 'example-order-id';
    const command = new client_eventbridge_1.PutEventsCommand({
        Entries: [
            {
                Source: 'beyond-lambdas.orders',
                DetailType: 'OrderPlaced',
                Detail: JSON.stringify({ orderId }),
                EventBusName: 'default',
            },
        ],
    });
    const response = await client.send(command);
    console.log('Event sent:', response);
    return { statusCode: 200, body: 'OrderPlaced event sent' };
};
