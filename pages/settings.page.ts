import { Page, Locator } from "@playwright/test";

export class SettingsPage {
  readonly page: Page;
  readonly settingsTitle: Locator;
  readonly profilePictureUrl: Locator;
  readonly usernameField: Locator;
  readonly bioField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly updateBtn: Locator;
  readonly logoutBtn: Locator;
  constructor(page: Page) {
    this.page = page;
    this.settingsTitle = page.getByRole("heading", { name: "Your Settings" });
    this.profilePictureUrl = page.getByRole("textbox", {
      name: "URL of profile picture",
    });
    this.usernameField = page.getByRole("textbox", { name: "Username" });
    this.bioField = page.getByRole("textbox", { name: "Short bio about you" });
    this.emailField = page.getByRole("textbox", { name: "Email" });
    this.passwordField = page.getByRole("textbox", { name: "New Password" });
    this.updateBtn = page.getByRole("button", { name: "Update Settings" });
    this.logoutBtn = page.getByRole("button", {
      name: "Or click here to logout.",
    });
  }

  async goto() {
    await this.page.goto("/settings");
  }

  async fillProfilePictureUrl(url: string) {
    await this.profilePictureUrl.fill(url);
  }

  async fillUsername(username: string) {
    await this.usernameField.fill(username);
  }

  async fillBio(bio: string) {
    await this.bioField.fill(bio);
  }

  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async update() {
    await this.updateBtn.click();
  }

  async logout() {
    await this.logoutBtn.click();
  }
}
