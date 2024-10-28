import { test, expect } from "@playwright/test";

test.describe("SignIn Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("正しい情報でサインインが成功する", async ({ page }) => {
    let consoleMessage = "";

    page.on("console", (msg) => {
      if (msg.type() === "log") {
        consoleMessage = msg.text();
      }
    });

    await page.fill("[data-testid=emailInput]", "test@example.com");
    await page.fill("[data-testid=passwordInput]", "password123");
    await page.click("[data-testid=signInButton]");

    await expect(consoleMessage).toBe("SignIn Successful");
  });

  test("誤ったメールアドレスのドメインでサインインが失敗する", async ({
    page,
  }) => {
    await page.fill('[data-testid="emailInput"]', "wrong@test.com");
    await page.fill('[data-testid="passwordInput"]', "password123");
    await page.click('[data-testid="signInButton"]');

    const errorMessage = await page.locator('[data-testid ="errorMessage"]');
    await expect(errorMessage).toHaveText(
      "メールアドレスのドメインは@example.comである必要があります。"
    );
  });

  test("パスワードの文字数が足りない", async ({ page }) => {
    await page.fill("[data-testid=emailInput]", "test@example.com");
    await page.fill("[data-testid=passwordInput]", "pass");
    await page.click("[data-testid=signInButton]");

    const errorMessage = await page.locator('[data-testid ="errorMessage"]');
    await expect(errorMessage).toHaveText(
      "パスワードは8文字以上である必要があります。"
    );
  });

  test("パスワード、もしくはメールアドレスが誤っている", async ({ page }) => {
    await page.fill("[data-testid=emailInput]", "wrong@example.com");
    await page.fill("[data-testid=passwordInput]", "wrongpassword");
    await page.click("[data-testid=signInButton]");

    const errorMessage = await page.locator('[data-testid ="errorMessage"]');
    await expect(errorMessage).toHaveText(
      "メールアドレス、もしくはパスワードが間違っています。"
    );
  });
});
