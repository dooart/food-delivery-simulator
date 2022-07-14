const Set = require("collections/set");
const Order = require("./Order");

const data = require("../data/dispatch_orders.json");

/**
 * Factory for Order objects. Will use external data to create a list of future orders.
 */
module.exports = class OrderFactory {
  constructor() {
    this.verifyData(data);
    this.futureOrders = data;
  }

  /**
   * Creates a new order based on the next future order available.
   * @returns Order object or null if no future orders left.
   */
  newOrder() {
    const orderData = this.futureOrders.shift();
    if (!orderData) return null;

    const { id, name, prepTime } = orderData;
    return new Order(id, name, prepTime);
  }

  /**
   * Creates a new Set of orders.
   *
   * @param values List of orders to include in the set
   * @returns New Set of orders
   */
  newOrderSet(values) {
    return new Set(values, (order, order2) => order.id === order2.id);
  }

  /**
   * Returns how many future orders are left to receive
   * @returns Number of orders left to receive
   */
  getFutureOrdersLeftCount() {
    return this.futureOrders.length;
  }

  /**
   * Fail-fast verification of external data
   * @param data Data to verify
   */
  verifyData(data) {
    const orderSet = this.newOrderSet(data);
    data.forEach((order) => {
      if (!orderSet.add(order)) throw new Error("Duplicated order ids in data.");
    });
  }
};
