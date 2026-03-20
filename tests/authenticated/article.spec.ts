import { test, expect } from "../../fixtures/base.fixtures";
import { generateArticle, Article } from "../../utils/fakeData";
import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { APIRequestContext } from "@playwright/test";

const tokenFile = path.join(__dirname, "../../playwright/.auth/token.json");

const editArticle = generateArticle();
const deleteArticle = generateArticle();
const postArticle = generateArticle();

test.describe("Article Tests", () => {
  let slugForEdit: string;
  let slugForDelete: string;
  let newTitle: string = faker.lorem.sentence();

  test.beforeAll(async ({ request }) => {
    const { token } = JSON.parse(fs.readFileSync(tokenFile, "utf-8"));
    const createArticle = async (
      request: APIRequestContext,
      token: string,
      articleData: Article,
    ) => {
      const response = await request.post(
        "https://api.realworld.show/api/articles",
        {
          headers: { Authorization: `Token ${token}` },
          data: { article: articleData },
        },
      );
      expect(response.ok()).toBeTruthy();
      const responseBody = await response.json();
      return responseBody.article.slug;
    };

    slugForEdit = await createArticle(request, token, editArticle);
    slugForDelete = await createArticle(request, token, deleteArticle);
  });

  test("Post Article", async ({ articlePage, page }) => {
    await articlePage.createArticle(
      postArticle.title,
      postArticle.description,
      postArticle.body,
      postArticle.tagList[0],
    );
    await expect(page).toHaveURL(/\/article\/.+/);
    await expect(
      page.getByRole("heading", { name: postArticle.title }),
    ).toBeVisible();
  });

  test("Edit Article", async ({ articleViewPage, articlePage, page }) => {
    await articleViewPage.goto(slugForEdit);
    await articleViewPage.clickEdit();
    await expect(
      page.getByRole("textbox", { name: "Article Title" }),
    ).toHaveValue(editArticle.title);
    await articlePage.fillTitle(newTitle);
    await articlePage.publish();
    await expect(page).toHaveURL(/\/article\/.+/);

    await expect(page.getByRole("heading", { name: newTitle })).toBeVisible();
  });

  test("Delete Article", async ({ articleViewPage, page }) => {
    await articleViewPage.goto(slugForDelete);
    await articleViewPage.clickDelete();
    await expect(page).toHaveURL(/\/$/);
  });

  test("Cannot post article due to missing data", async ({
    articlePage,
    page,
  }) => {
    await articlePage.goto();
    await articlePage.publish();
    await expect(page.getByText("title can't be blank")).toBeVisible();
    await expect(page.getByText("description can't be blank")).toBeVisible();
    await expect(page.getByText("body can't be blank")).toBeVisible();
  });
});
