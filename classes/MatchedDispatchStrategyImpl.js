/**
 * Dispatch strategy where each courier can only collect the order that triggered their request
 */
module.exports = class MatchedDispatchStrategyImpl {
  /**
   * Tries to match courier and order
   * @param courier Courier picking up orders
   * @param orders List of orders that are ready
   * @returns The order if a match was found, null if no match
   */
  grabOrder(courier, orders) {
    const ordersReady = orders.filter((order) => order.isReady() && order === courier.orderThatTriggeredDispatch);
    return ordersReady.one() || null;
  }
};
