const DispatchStrategyEnum = require("./enums/DispatchStrategyEnum");
const Simulation = require("./classes/Simulation");

/**
 * Prints command line instructions
 */
function printUsage(allowedArgs) {
  console.log("Usage:");
  console.log(`  node index.js [${allowedArgs.join("|")}]`);
}

/**
 * Runs the simulation using the command line args as configuration
 */
function run() {
  const allowedArgs = Object.keys(DispatchStrategyEnum);
  if (process.argv < 3) return printUsage();

  const dispatchStrategy = process.argv[2];
  if (!allowedArgs.includes(dispatchStrategy)) return printUsage(allowedArgs);

  new Simulation(DispatchStrategyEnum[dispatchStrategy]).run();
}

run();
