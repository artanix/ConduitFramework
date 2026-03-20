import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");
const tokenFile = path.join(__dirname, "../playwright/.auth/token.json");

const timestamp = Date.now();
const testUser = {
  username: `${process.env.TEST_USERNAME}${timestamp}`,
  email: `${process.env.TEST_USERNAME}${timestamp}${process.env.TEST_EMAIL_DOMAIN}`,
  password: process.env.TEST_PASSWORD!,
};

setup("authenticate", async ({ request, page }) => {
  const registerResponse = await request.post(`${process.env.API_URL}/users`, {
    data: {
      user: {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      },
    },
  });
  expect(registerResponse.ok()).toBeTruthy();
  const response = await request.post(`${process.env.API_URL}/users/login`, {
    data: {
      user: {
        email: testUser.email,
        password: testUser.password,
      },
    },
  });
  const responseBody = await response.json();
  const authToken = responseBody.user.token;

  await page.goto(`${process.env.BASE_URL}`);
  await page.evaluate((token) => {
    localStorage.setItem("jwtToken", token);
  }, authToken);
  await page.context().storageState({ path: authFile });
  fs.writeFileSync(
    tokenFile,
    JSON.stringify({
      token: authToken,
      username: testUser.username,
      email: testUser.email,
      password: testUser.password,
    }),
  );
});
