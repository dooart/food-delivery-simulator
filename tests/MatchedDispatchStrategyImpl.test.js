const CourierFactory = require("../classes/CourierFactory");
const MatchedDispatchStrategyImpl = require("../classes/MatchedDispatchStrategyImpl");
const OrderFactory = require("../classes/OrderFactory");

test("The matched dispatch strategy should return the order assigned to a courier", () => {
  const dispatchStrategy = new MatchedDispatchStrategyImpl();

  const orderFactory = new OrderFactory();
  const order = orderFactory.newOrder();
  order.readyAt = Date.now();

  const courierFactory = new CourierFactory();
  const courier = courierFactory.newCourier(order);

  const grabbedOrder = dispatchStrategy.grabOrder(courier, [order]);
  expect(grabbedOrder).toBe(order);
});

test("The matched dispatch strategy should not return the order if it's the wrong courier", () => {
  const dispatchStrategy = new MatchedDispatchStrategyImpl();

  const orderFactory = new OrderFactory();
  const order = orderFactory.newOrder();
  const order2 = orderFactory.newOrder();
  order.readyAt = Date.now();

  const courierFactory = new CourierFactory();
  const courier = courierFactory.newCourier(order2);

  const grabbedOrder = dispatchStrategy.grabOrder(courier, [order]);
  expect(grabbedOrder).not.toBe(order);
});
