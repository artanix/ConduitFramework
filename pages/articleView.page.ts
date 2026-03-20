import { Page, Locator } from "@playwright/test";

export class ArticleViewPage {
  readonly page: Page;
  readonly editBtn: Locator;
  readonly deleteBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editBtn = this.page
      .getByRole("link", { name: /Edit Article/ })
      .first();
    this.deleteBtn = this.page
      .getByRole("button", { name: /Delete Article/ })
      .first();
  }

  async goto(slug: string) {
    await this.page.goto(`/article/${slug}`);
  }

  async clickEdit() {
    await this.editBtn.click();
  }

  async clickDelete() {
    await this.deleteBtn.click();
  }
}
