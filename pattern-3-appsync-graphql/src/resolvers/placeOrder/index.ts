import { v4 as uuidv4 } from 'uuid';

exports.handler = async (event: any) => {
  const { userId, total } = event.arguments;

  const newOrder = {
    id: uuidv4(),
    userId,
    total,
    status: 'PENDING',
  };

  console.log('Placing order:', newOrder);

  // In a real app, store to DB or emit to EventBridge
  return newOrder;
};