const SortedSet = require("collections/sorted-set");
const { getRandomInt } = require("../lib/utils");
const Courier = require("./Courier");

const MIN_ARRIVAL_TIME_SECONDS = 3;
const MAX_ARRIVAL_TIME_SECONDS = 15;

/**
 * Factory for Courier objects
 */
module.exports = class CourierFactory {
  /**
   * Creates a new CourierFactory.
   *
   * @param minArrivalTimeInSeconds Minimum time of arrival for any given courier
   * @param maxArrivalTimeInSeconds Maximum time of arrival for any given courier
   */
  constructor(minArrivalTimeInSeconds = MIN_ARRIVAL_TIME_SECONDS, maxArrivalTimeInSeconds = MAX_ARRIVAL_TIME_SECONDS) {
    this.minArrivalTimeInSeconds = minArrivalTimeInSeconds;
    this.maxArrivalTimeInSeconds = maxArrivalTimeInSeconds;

    this.courierCount = 0;
  }

  /**
   * Creates a new Courier.
   *
   * @param orderThatTriggeredDispatch Order that triggered this courier request
   */
  newCourier(orderThatTriggeredDispatch) {
    this.courierCount++;

    const id = this.courierCount;
    const deltaArrivalTime = this.maxArrivalTimeInSeconds - this.minArrivalTimeInSeconds;
    const arrivalTimeInSeconds = this.minArrivalTimeInSeconds + getRandomInt(deltaArrivalTime);

    return new Courier(id, arrivalTimeInSeconds, orderThatTriggeredDispatch);
  }

  /**
   * Creates a new Set of couriers.
   *
   * @param values List of couriers to include in the set
   * @returns New Set of couriers
   */
  newCourierSet(values = []) {
    return new SortedSet(
      values,
      (courier, courier2) => courier.id === courier2.id,
      (courier, courier2) => {
        return courier.getArrivalTime() - courier2.getArrivalTime() || courier.id - courier2.id;
      }
    );
  }
};
