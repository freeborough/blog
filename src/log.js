import pino from "pino";

const log = new pino();
log.level = process.env.LOG_LEVEL || "warn";
export default log;