import { test, expect } from "../../fixtures/base.fixtures";
import { generateArticle } from "../../utils/fakeData";
import fs from "fs";
import path from "path";

const tokenFile = path.join(__dirname, "../../playwright/.auth/token.json");

const article = generateArticle();

test.describe("Article Tests", () => {
  test.beforeAll(async ({ request }) => {
    const { token } = JSON.parse(fs.readFileSync(tokenFile, "utf-8"));
    const response = await request.post(
      "https://api.realworld.show/api/articles",
      {
        headers: {
          Authorization: `Token ${token}`,
        },
        data: {
          article: {
            title: article.title,
            description: article.description,
            body: article.body,
            tagList: article.tagList,
          },
        },
      },
    );
    expect(response.ok()).toBeTruthy();
  });

  test("Post Article", async ({ articlePage, page }) => {
    await articlePage.createArticle(
      article.title,
      article.description,
      article.body,
      article.tagList[0],
    );
    await expect(page).toHaveURL(/\/article\/.+/);
    await expect(
      page.getByRole("heading", { name: article.title }),
    ).toBeVisible();
  });
});
