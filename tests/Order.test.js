const Order = require("../classes/Order");

test("If an order is done, then isReady() should say it is", () => {
  const now = Date.now();

  const order = new Order();
  order.prepTimeInSeconds = 15;
  order.createdAt = now - 16 * 1000;
  order.checkReady(now);

  expect(order.isReady()).toBe(true);
});

test("If an order is not done, then isReady() should say it is not", () => {
  const now = Date.now();

  const order = new Order();
  order.prepTimeInSeconds = 15;
  order.createdAt = now - 14 * 1000;
  order.checkReady(now);

  expect(order.isReady()).toBe(false);
});
