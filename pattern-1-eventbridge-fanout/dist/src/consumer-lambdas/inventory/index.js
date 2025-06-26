"use strict";
exports.handler = async (event) => {
    for (const record of event.Records) {
        const body = JSON.parse(record.body);
        const detail = JSON.parse(body.Detail);
        console.log(`[Inventory Service] Processing order: ${detail.orderId}`);
    }
    return {
        statusCode: 200,
        body: 'Processed',
    };
};
