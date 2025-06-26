exports.handler = async (event: any) => {
    console.log("Sending email confirmation for order:", event);
    return { ...event, emailed: true };
  };
  