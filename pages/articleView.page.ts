import { Page } from "@playwright/test";

export class ArticleViewPage {
  constructor(private page: Page) {}

  async goto(slug: string) {
    await this.page.goto(`/article/${slug}`);
  }

  async clickEdit() {
    await this.page
      .getByRole("link", { name: /Edit Article/ })
      .first()
      .click();
  }

  async clickDelete() {
    await this.page
      .getByRole("button", { name: /Delete Article/ })
      .first()
      .click();
  }
}
