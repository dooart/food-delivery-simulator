const CourierFactory = require("../classes/CourierFactory");
const FifoDispatchStrategyImpl = require("../classes/FifoDispatchStrategyImpl");
const OrderFactory = require("../classes/OrderFactory");

test("The FIFO dispatch strategy should return the first order available", () => {
  const dispatchStrategy = new FifoDispatchStrategyImpl();

  const orderFactory = new OrderFactory();
  const order = orderFactory.newOrder();
  const order2 = orderFactory.newOrder();
  [order, order2].forEach((order) => (order.readyAt = Date.now()));

  const courierFactory = new CourierFactory();
  const courier = courierFactory.newCourier();

  const grabbedOrder = dispatchStrategy.grabOrder(courier, [order, order2]);
  expect(grabbedOrder).toBe(order);
});
