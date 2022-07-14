/**
 * An "Interface" for DispatchStrategy implementations, using composition instead of inheritance.
 */
module.exports = class DispatchStrategy {
  constructor(dispatchStrategyImpl) {
    this.dispatchStrategyImpl = dispatchStrategyImpl;
  }

  grabOrder(courier, order) {
    return this.dispatchStrategyImpl.grabOrder(courier, order);
  }
};
