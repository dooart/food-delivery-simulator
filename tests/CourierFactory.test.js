const OrderFactory = require("../classes/OrderFactory");
const CourierFactory = require("../classes/CourierFactory");

test("CourierFactory can be used to create a courier", () => {
  const courierFactory = new CourierFactory();
  const courier = courierFactory.newCourier();
  expect(courier).not.toBeNull();
  expect(courier.orderThatTriggeredDispatch).toBeNull();
});

test("CourierFactory can be used to create a courier to grab a specific order", () => {
  const orderFactory = new OrderFactory();
  const orderThatTriggeredDispatch = orderFactory.newOrder();

  const courierFactory = new CourierFactory();
  const courier = courierFactory.newCourier(orderThatTriggeredDispatch);
  expect(courier).not.toBeNull();
  expect(courier.orderThatTriggeredDispatch).not.toBeNull();
});
