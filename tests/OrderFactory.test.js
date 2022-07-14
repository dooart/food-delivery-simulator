const OrderFactory = require("../classes/OrderFactory");

test("OrderFactory can be used to create a Order", () => {
  const orderFactory = new OrderFactory();
  const order = orderFactory.newOrder();
  expect(order).not.toBeNull();
  expect(order.id).not.toBeNull();
  expect(order.name).not.toBeNull();
  expect(order.prepTime).not.toBeNull();
});
