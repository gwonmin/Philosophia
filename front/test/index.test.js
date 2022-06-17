const { validateEmail } = require("../src/util.js");

test("adds 1 + 2 to equal 3", () => {
  const res1 = validateEmail("shawncodinggmail.com");
  expect(res1).toBe(true);
  const res = validateEmail("shawncoding@gmail.com");
  expect(res).toBe(true);
});
