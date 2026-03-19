import { test, expect } from "../../fixtures/base.fixtures";

const timestamp = Date.now();
const testUser = {
  username: `user${timestamp}`,
  email: `user${timestamp}@test.com`,
  password: "password123",
};

test("Register a new user", async ({ registerPage, page }) => {
  await registerPage.goto();
  await registerPage.register(
    testUser.username,
    testUser.email,
    testUser.password,
  );
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText(testUser.username)).toBeVisible();
});
