import { Page } from "@playwright/test";

export class ArticlePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/editor");
  }

  async fillTitle(title: string) {
    await this.page.getByRole("textbox", { name: "Article Title" }).fill(title);
  }

  async fillAbout(about: string) {
    await this.page
      .getByRole("textbox", { name: "What's this article about?" })
      .fill(about);
  }

  async fillContent(content: string) {
    await this.page
      .getByRole("textbox", { name: "Write your article (in markdown)" })
      .fill(content);
  }

  async fillTags(tags: string) {
    await this.page.getByRole("textbox", { name: "Enter tags" }).fill(tags);
    await this.page.getByRole("textbox", { name: "Enter tags" }).press("Enter");
  }

  async publish() {
    await this.page.getByRole("button", { name: "Publish Article" }).click();
  }

  async createArticle(
    title: string,
    about: string,
    content: string,
    tags: string,
  ) {
    await this.goto();
    await this.fillTitle(title);
    await this.fillAbout(about);
    await this.fillContent(content);
    await this.fillTags(tags);
    await this.publish();
  }
}
