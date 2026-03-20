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
  await request.post("https://api.realworld.show/api/users", {
    data: {
      user: {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      },
    },
  });

  const response = await request.post(
    "https://api.realworld.show/api/users/login",
    {
      data: {
        user: {
          email: testUser.email,
          password: testUser.password,
        },
      },
    },
  );
  const responseBody = await response.json();
  const authToken = responseBody.user.token;

  await page.goto("https://demo.realworld.show/");
  await page.evaluate((token) => {
    localStorage.setItem("jwtToken", token);
  }, authToken);
  await page.context().storageState({ path: authFile });
  fs.writeFileSync(tokenFile, JSON.stringify({ token: authToken }));
});
