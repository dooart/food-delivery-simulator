module.exports = {
  /**
   * Returns a random integer between 0 and max
   * @param max Upper bound for random integer
   * @returns Random integer between 0 and max
   */
  getRandomInt: function (max) {
    return Math.floor(Math.random() * max);
  },

  /**
   * Returns a promise that'll resolve after the specified timeout
   * @param timeout Time in milisseconds to wait until promise resolves
   * @returns Promise that'll resolve upon timeout
   */
  delay: function (timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  },
};
