const OrderFactory = require("./OrderFactory");
const CourierFactory = require("./CourierFactory");
const DispatchStrategyFactory = require("./DispatchStrategyFactory");
const { delay } = require("../lib/utils");

/** Interval in milisseconds between ticks */
const TICK_TIMEOUT = 10;

/** Elapsed time until new orders come in */
const TIME_UNTIL_NEW_ORDERS = 1000;

/** How many orders come in at a time */
const ORDERS_PER_TURN = 2;

/**
 * Class that runs the simulation, tick by tick.
 */
module.exports = class Simulation {
  /**
   * Creates a new Simulation.
   *
   * @param dispatchStrategyEnum The strategy that controls how couriers are assigned to orders.
   * Check DispatchStrategyEnum for possible values.
   */
  constructor(dispatchStrategyEnum) {
    this.dispatchStrategy = new DispatchStrategyFactory(dispatchStrategyEnum).newDispatchStrategy();
    this.orderFactory = new OrderFactory();
    this.courierFactory = new CourierFactory();
    this.orders = this.orderFactory.newOrderSet();
    this.couriers = this.courierFactory.newCourierSet();

    this.startedAt = Date.now();
    this.lastOrdersAt = this.startedAt;
    this.statistics = {
      ordersPickedUp: 0,
      totalFoodWaitTime: 0,
      totalCourierWaitTime: 0,
    };
  }

  /** Runs the simulation */
  async run() {
    while (this.tick()) {
      await delay(TICK_TIMEOUT);
    }
  }

  /**
   * Runs one iteration of the simulation.
   * @returns Boolean value indicating whether or not the simulation should keep running.
   */
  tick() {
    this.checkNewOrders();
    this.checkOrdersReady();
    this.checkCouriersArrival();
    this.pickUpAvailableOrders();

    const areThereFutureOrders = this.orderFactory.getFutureOrdersLeftCount() > 0;
    const areThereOrdersToPickUp = this.orders.length > 0;
    const keepRunning = areThereFutureOrders || areThereOrdersToPickUp;
    if (!keepRunning) this.printStatistics();

    return keepRunning;
  }

  /** Checks if there are any new orders */
  checkNewOrders() {
    if (Date.now() - this.lastOrdersAt > TIME_UNTIL_NEW_ORDERS) {
      for (let i = 0; i < ORDERS_PER_TURN; i++) {
        this.receiveOrder();
      }
      this.lastOrdersAt = Date.now();
    }
  }

  /** Check which orders are ready */
  checkOrdersReady() {
    this.orders.forEach((order) => order.checkReady());
  }

  /** Check which couriers have arrived */
  checkCouriersArrival() {
    this.couriers.forEach((courier) => courier.checkArrival());
  }

  /**
   * Attempts to match couriers with orders and whenever there's a match, updates collections
   * so both order and courier are removed from the processing queue
   */
  pickUpAvailableOrders() {
    const couriersGone = [];

    const couriersWaiting = this.couriers.filter((courier) => courier.hasArrived());
    couriersWaiting.forEach((courier) => {
      const order = courier.tryAndPickUpOrder(this.orders, this.dispatchStrategy);
      if (order) {
        this.orders.delete(order);
        couriersGone.push(courier);
        this.logPickedUpOrder(courier, order);
      }
    });

    couriersGone.forEach((courier) => this.couriers.delete(courier));
  }

  /**
   * Adds an order to the queue and requests a courier to pick it up
   */
  receiveOrder() {
    const order = this.orderFactory.newOrder();
    if (order) {
      this.orders.add(order);
      this.log(`🍔 Order received: ${order.name}!`);

      this.dispatchCourier(order);
    }
  }

  /**
   * Requests a courier to pick up an order
   * @param order The order that triggered the courier request
   */
  dispatchCourier(order) {
    const courier = this.courierFactory.newCourier(order);
    this.couriers.add(courier);

    this.log(`🚚 Courier dispatched, ETA: ${courier.arrivalTimeInSeconds} seconds`);
  }

  /**
   * Logs to the console whenever an order is picked up by a courier
   * @param courier Courier who picked up the order
   * @param order Order that was picked up
   */
  logPickedUpOrder(courier, order) {
    const foodWaitTime = Date.now() - order.readyAt;
    const courierWaitTime = Date.now() - courier.arrivedAt;

    this.statistics.ordersPickedUp++;
    this.statistics.totalFoodWaitTime += foodWaitTime;
    this.statistics.totalCourierWaitTime += courierWaitTime;

    this.log(`📦 Order picked up! Food wait time since ready: ${foodWaitTime}. Courier wait time: ${courierWaitTime}`);
  }

  /**
   * Prints statistics on average waiting time for both food that's ready and/or couriers that have arrived
   */
  printStatistics() {
    const averageFoodWaitTime = this.statistics.totalFoodWaitTime / this.statistics.ordersPickedUp;
    const averageCourierWaitTime = this.statistics.totalCourierWaitTime / this.statistics.ordersPickedUp;
    this.log("-------------------------------");
    this.log("✅ Closed for the day!");
    this.log(`Average food wait time: ${averageFoodWaitTime.toFixed(2)}`);
    this.log(`Average courier wait time: ${averageCourierWaitTime.toFixed(2)}`);
  }

  /**
   * Log utility with timestamps. Use it the same way as console.log
   * @param props Params to forward to console.log
   */
  log(...props) {
    const elapsedSeconds = (Date.now() - this.startedAt) / 1000;
    const timestamp = (elapsedSeconds.toFixed(2) + "s").padStart(4, " ");
    const formattedTimestamp = `\x1b[2m${timestamp}\x1b[0m`;
    console.log(formattedTimestamp, ...props);
  }
};
