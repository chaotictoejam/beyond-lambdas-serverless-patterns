import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const client = new EventBridgeClient({});

exports.handler = async (event: any) => {
  const orderId = event.orderId || 'example-order-id';

  const command = new PutEventsCommand({
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
