import { expect } from "@playwright/test";
import { chromium } from "playwright";
import GoogleSearch from "../page-objects/google-page";
import { writeTxtFile } from "../support/helpers";

(async function crawler(search: string, keyboardKey: string, htmlTag: string) {
  //browser start
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
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
})("", "", "");

/**
 * crawler function has three parameters that we can use
 * search: is an input in google search field
 * keyboardKey: is simulating press of Control or Cmd depending on the system that script is being run on and values are "Control" for Windows and "Meta" for MacOS
 * htmlTag: is a tag from which we extract text and depending on what we need we can write it "body", "div", or if we need class, href or some other attribute we write "[class]", "[id]"
 */
