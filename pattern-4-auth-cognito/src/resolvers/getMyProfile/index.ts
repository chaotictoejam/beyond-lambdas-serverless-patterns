exports.handler = async (event: any) => {
  const claims = event.identity?.claims;
  const userId = claims?.sub;
  const email = claims?.email;

  console.log("User claims:", claims);

  return {
    id: userId,
    email: email,
  };
};