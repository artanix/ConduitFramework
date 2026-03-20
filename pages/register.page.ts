import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signupBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = this.page.getByRole("textbox", { name: "Username" });
    this.emailField = this.page.getByRole("textbox", { name: "Email" });
    this.passwordField = this.page.getByRole("textbox", { name: "Password" });
    this.signupBtn = this.page.getByRole("button", { name: "Sign up" });
  }

  async goto() {
    await this.page.goto("/register");
  }

  async register(user: string, email: string, password: string) {
    await this.usernameField.fill(user);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.signupBtn.click();
  }
}
