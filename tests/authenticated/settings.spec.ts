import { test, expect } from "../../fixtures/base.fixtures";
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

const userFile = path.join(__dirname, "../../playwright/.auth/token.json");

const { token, username, email, password } = JSON.parse(
  fs.readFileSync(userFile, "utf-8"),
);

test.describe("Check Main User Settings", () => {
  test.beforeEach(async ({ request }) => {
    const resetEmailUserPass = await request.put(
      `${process.env.API_URL}/user`,
      {
        headers: { Authorization: `Token ${token}` },
        data: {
          user: {
            username,
            email,
            password,
          },
        },
      },
    );
    expect(resetEmailUserPass.ok()).toBeTruthy();
  });

  test("Change Username", async ({ settingsPage, page }) => {
    const username = faker.internet.username();
    await settingsPage.goto();
    await settingsPage.fillUsername(username);
    await settingsPage.update();
    await expect(page).toHaveURL(/\/profile\//);
    await settingsPage.goto();
    await expect(settingsPage.usernameField).toHaveValue(username);
  });

  test("Change Email", async ({ settingsPage, page }) => {
    const email = faker.internet.email();
    await settingsPage.goto();
    await settingsPage.fillEmail(email);
    await settingsPage.update();
    await expect(page).toHaveURL(/\/profile\//);
    await settingsPage.goto();
    await expect(settingsPage.emailField).toHaveValue(email);
  });

  test("Change Profile Picture URL", async ({ settingsPage, page }) => {
    const avatarUrl = faker.image.avatar();
    await settingsPage.goto();
    await settingsPage.fillProfilePictureUrl(avatarUrl);
    await settingsPage.update();
    await expect(page).toHaveURL(/\/profile\//);
    await settingsPage.goto();
    await expect(settingsPage.profilePictureUrl).toHaveValue(avatarUrl);
  });

  test("Change Bio", async ({ settingsPage, page }) => {
    const bio = faker.food.description();
    await settingsPage.goto();
    await settingsPage.fillBio(bio);
    await settingsPage.update();
    await expect(page).toHaveURL(/\/profile\//);
    await settingsPage.goto();
    await expect(settingsPage.bioField).toHaveValue(bio);
  });

  test.describe("Change Password", () => {
    test.describe.configure({ mode: "serial" });
    test("Change Password", async ({ settingsPage, request, page }) => {
      const password = faker.internet.password();
      await settingsPage.goto();
      await settingsPage.fillPassword(password);
      await settingsPage.update();
      await expect(page).toHaveURL(/\/profile\//);
      await settingsPage.goto();
      const checkPassword = await request.post(
        `${process.env.API_URL}/users/login`,
        {
          data: {
            user: {
              email,
              password,
            },
          },
        },
      );
      await expect(checkPassword.ok()).toBeTruthy();
    });
  });
});
