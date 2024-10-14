import { expect } from "@playwright/test";
import { chromium } from "playwright";
import GoogleSearch from "../page-objects/google-page";
import { writeTxtFile } from "../support/helpers";

export default async function crawler(
  search: string,
  keyboardKey: string,
  htmlTag: string
) {
  //browser start
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  //google page page object
  const google = new GoogleSearch(page);

  // visits google
  await page.goto("https://www.google.com");

  //performs google search and gets text
  await google.searchGoogle(search);
  await expect(google.resultLink.first()).toBeVisible({ timeout: 30000 });

  for (let i = 0; i < 3; i++) {
    const result = await google.openResultLink(i, keyboardKey, htmlTag);
    writeTxtFile(i, result);
    console.log(result);
  }

  await browser.close();
}
