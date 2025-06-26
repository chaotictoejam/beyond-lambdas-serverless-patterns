import { Logger} from "@aws-lambda-powertools/logger";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { Metrics } from "@aws-lambda-powertools/metrics";
import { Context } from "aws-lambda";

const logger = new Logger();
const tracer = new Tracer();
const metrics = new Metrics();

export const handler = async (event: any, context: Context) => {
  logger.info("Processing event", { event });

  metrics.addMetric("ProcessedMessages", "Count", 1);

  if (event.shouldFail) {
    logger.error("Simulated failure!");
    throw new Error("Intentional Failure");
  }

  return {
    statusCode: 200,
    body: "Success!",
  };
};
