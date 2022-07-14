/**
 * Representation of an order
 */
module.exports = class Order {
  /**
   * Creates a new Order. NB! Use OrderFactory instead.
   *
   * @param id Order ID
   * @param name Name of the ordered food
   * @param prepTimeInSeconds How long in seconds until ready
   */
  constructor(id, name, prepTimeInSeconds) {
    this.id = id;
    this.name = name;
    this.prepTimeInSeconds = prepTimeInSeconds;
    this.createdAt = Date.now();
  }

  /**
   * Gets the predicted preparation time
   * @returns Predicted preparation time
   */
  getPredictedReadyTime() {
    return this.createdAt + this.prepTimeInSeconds * 1000;
  }

  /**
   * Gets preparation time.
   * @returns The time when an order gets done. If the order isn't done yet, returns the predicted
   * preparation time
   */
  getReadyTime() {
    return this.readyAt ? this.readyAt : this.getPredictedReadyTime();
  }

  /**
   * Checks if the order is done. If yes, records the preparation timestamp
   * @param now Included here for testing purposes. Don't provide this.
   */
  checkReady(now = Date.now()) {
    if (this.isReady()) return;

    if (now >= this.getPredictedReadyTime()) {
      this.readyAt = now;
    }
  }

  /**
   * Retuns boolean value indicating whether or not an order is done
   * @returns true if done, false if not
   */
  isReady() {
    return !!this.readyAt;
  }
};
