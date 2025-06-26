exports.handler = async (event: any) => {
  console.log('[Analytics Service] Processing order');

  return {
    statusCode: 200,
    body: 'Processed',
  };
};