exports.handler = async (event: any) => {
    console.log("Charging customer for order:", event);
    return { ...event, charged: true };
  };  