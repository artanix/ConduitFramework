import { Page } from "@playwright/test";

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/register");
  }

  async register(user: string, email: string, password: string) {
    await this.page.getByRole("textbox", { name: "Username" }).fill(user);
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Sign up" }).click();
  }
}
