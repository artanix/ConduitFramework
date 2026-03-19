import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/login");
  }

  async fillEmail(email: string) {
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
  }

  async clickLogin() {
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }

  async login(email: string, password: string) {
    await this.goto();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
