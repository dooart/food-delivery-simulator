const Courier = require("../classes/Courier");

test("If an courier has arrived, then hasArrived() should say they have", () => {
  const now = Date.now();

  const courier = new Courier();
  courier.arrivalTimeInSeconds = 15;
  courier.createdAt = now - 16 * 1000;
  courier.checkArrival(now);

  expect(courier.hasArrived(now)).toBe(true);
});

test("If an courier hasn't arrived, then hasArrived() should say they haven't", () => {
  const now = Date.now();

  const courier = new Courier();
  courier.arrivalTimeInSeconds = 15;
  courier.createdAt = now - 14 * 1000;
  courier.checkArrival(now);

  expect(courier.hasArrived(now)).toBe(false);
});
