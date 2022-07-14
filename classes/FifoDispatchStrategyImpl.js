/**
 * Dispatch strategy where couriers can collect any available order when they arrive
 */
module.exports = class FifoDispatchStrategyImpl {
  /**
   * Tries to find an order that's ready
   * @param orders List of orders that are ready
   * @returns The order if a order was found for collection, null if no order available
   */
  grabOrder(_, orders) {
    const ordersReady = orders.filter((order) => order.isReady());
    const areThereAvailableOrders = ordersReady.length > 0;
    return areThereAvailableOrders ? ordersReady.one() : null;
  }
};
