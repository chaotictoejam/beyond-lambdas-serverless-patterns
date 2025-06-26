exports.handler = async (event: any) => {
  console.log('[Email Service] Processing order');

  return {
    statusCode: 200,
    body: 'Processed',
  };
};