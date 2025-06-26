"use strict";
exports.handler = async (event) => {
    for (const record of event.Records) {
        const body = JSON.parse(record.body);
        const detail = JSON.parse(body.Detail);
        console.log(`[Email Service] Processing order: ${detail.orderId}`);
        // Simulate sending an email...
    }
    return {
        statusCode: 200,
        body: 'Processed',
    };
};
