module.exports = {
  waitForNSecs: (n) => {
    return new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, n * 1000);
    });
  },
};
