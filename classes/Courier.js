/**
 * Representation of a courier.
 */
module.exports = class Courier {
  /**
   * Creates a new Courier. NB! Use CourierFactory instead.
   *
   * @param id Courier ID
   * @param arrivalTimeInSeconds ETA until courier arrives
   * @param orderThatTriggeredDispatch Order that triggered this courier request
   */
  constructor(id, arrivalTimeInSeconds, orderThatTriggeredDispatch = null) {
    this.id = id;
    this.arrivalTimeInSeconds = arrivalTimeInSeconds;
    this.orderThatTriggeredDispatch = orderThatTriggeredDispatch;
    this.createdAt = Date.now();
    this.arrivedAt = null;
  }

  /**
   * Gets the predicted arrival time
   * @returns Predicted arrival time
   */
  getPredictedArrivalTime() {
    return this.createdAt + this.arrivalTimeInSeconds * 1000;
  }

  /**
   * Gets arrival time.
   * @returns The time when a courier arrived to pick up food. If the courier hasn't arrived yet, returns
   * the predicted arrival time
   */
  getArrivalTime() {
    return this.arrivedAt ? this.arrivedAt : this.getPredictedArrivalTime();
  }

  /**
   * Checks if the courier has arrived. If they did, records the arrival timestamp
   * @param now Included here for testing purposes. Don't provide this.
   */
  checkArrival(now = Date.now()) {
    if (this.hasArrived()) return;

    if (now >= this.getPredictedArrivalTime()) {
      this.arrivedAt = now;
    }
  }

  /**
   * Retuns boolean value indicating whether or not a courier has arrived
   * @returns true if arrived, false if not
   */
  hasArrived() {
    return !!this.arrivedAt;
  }

  /**
   * Tries to match a courier with one of the pending orders
   * @param orders All the pending orders
   * @param dispatchStrategy See class Simulation
   * @returns The order if matched, null if not matched
   */
  tryAndPickUpOrder(orders, dispatchStrategy) {
    return dispatchStrategy.grabOrder(this, orders);
  }
};
