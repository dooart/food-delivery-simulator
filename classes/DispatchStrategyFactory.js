const DispatchStrategyEnum = require("../enums/DispatchStrategyEnum");
const DispatchStrategy = require("./DispatchStrategy");
const FifoDispatchStrategyImpl = require("./FifoDispatchStrategyImpl");
const MatchedDispatchStrategyImpl = require("./MatchedDispatchStrategyImpl");

const { MATCHED, FIFO } = DispatchStrategyEnum;

/**
 * Factory that handles creation of DispatchStrategy implementations
 */
module.exports = class DispatchStrategyFactory {
  /**
   * Creates a new DispatchStrategyFactory
   *
   * @param dispatchStrategyEnum The strategy that controls how couriers are assigned to orders.
   * Check DispatchStrategyEnum for possible values.
   */
  constructor(dispatchStrategyEnum) {
    if (!Object.values(DispatchStrategyEnum).includes(dispatchStrategyEnum)) {
      throw new Error("Invalid dispatch strategy type");
    }

    const strategies = { [MATCHED]: MatchedDispatchStrategyImpl, [FIFO]: FifoDispatchStrategyImpl };
    this.dispatchStrategyImpl = strategies[dispatchStrategyEnum];
  }

  /**
   * Creates a new DispatchStrategy implementation based on configuration received in the constructor
   * @returns New DispatchStrategy implementation
   */
  newDispatchStrategy() {
    return new DispatchStrategy(new this.dispatchStrategyImpl());
  }
};
