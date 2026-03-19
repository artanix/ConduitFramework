import { test, expect } from "../../fixtures/base.fixtures";

const timestamp = Date.now();
const testUser = {
  username: `user${timestamp}`,
  email: `user${timestamp}@test.com`,
  password: "password123",
};

test.describe("Login Tests", () => {
  test.beforeAll(async ({ request }) => {
    const response = await request.post(
      "https://api.realworld.show/api/users",
      {
        data: {
          user: {
            username: testUser.username,
            email: testUser.email,
            password: testUser.password,
          },
        },
      },
    );
    expect(response.ok()).toBeTruthy();
  });

  test("Login with valid credentials", async ({ loginPage, page }) => {
    await loginPage.login(testUser.email, testUser.password);
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText(testUser.username)).toBeVisible();
  });

  test("Login with invalid credentials", async ({ loginPage, page }) => {
    await loginPage.login(testUser.email, "wrongpassword");
    await expect(page.getByText("credentials invalid")).toBeVisible();
  });
});
