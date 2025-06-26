exports.handler = async (event: any) => {
  console.log('[Inventory Service] Processing order');

  return {
    statusCode: 200,
    body: 'Processed',
  };
};