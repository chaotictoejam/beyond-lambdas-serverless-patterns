exports.handler = async (event: any) => {
    console.log("Validating order:", event);
    return { ...event, validated: true };
  };  