import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const client = new EventBridgeClient({});

exports.handler = async (event: any) => {
  const detail = event;
  const params = {
    Entries: [
      {
        Source: 'custom.orders',
        DetailType: 'OrderPlaced',
        Detail: JSON.stringify(detail),
        EventBusName: process.env.EVENT_BUS_NAME || 'default',
      },
    ],
  };
  await client.send(new PutEventsCommand(params));
  console.log('OrderPlaced event sent:', detail);
  return { statusCode: 200, body: 'Event sent' };
}; 