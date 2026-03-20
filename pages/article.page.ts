import { Page, Locator } from "@playwright/test";

export class ArticlePage {
  readonly page: Page;
  readonly titleField: Locator;
  readonly aboutField: Locator;
  readonly contentField: Locator;
  readonly tagsField: Locator;
  readonly publishBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleField = this.page.getByRole("textbox", { name: "Article Title" });
    this.aboutField = this.page.getByRole("textbox", {
      name: "What's this article about?",
    });
    this.contentField = this.page.getByRole("textbox", {
      name: "Write your article (in markdown)",
    });
    this.tagsField = this.page.getByRole("textbox", { name: "Enter tags" });
    this.publishBtn = this.page.getByRole("button", {
      name: "Publish Article",
    });
  }

  async goto(slug?: string) {
    await this.page.goto(slug ? `/editor/${slug}` : "/editor");
  }

  async fillTitle(title: string) {
    await this.titleField.fill(title);
  }

  async fillAbout(about: string) {
    await this.aboutField.fill(about);
  }

  async fillContent(content: string) {
    await this.contentField.fill(content);
  }

  async fillTags(tags: string) {
    await this.tagsField.fill(tags);
    await this.tagsField.press("Enter");
  }

  async publish() {
    await this.publishBtn.click();
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
