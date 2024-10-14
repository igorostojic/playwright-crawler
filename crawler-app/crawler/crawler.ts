import { expect } from "@playwright/test";
import { chromium } from "playwright";
import GoogleSearch from "../pages/google-page";
import { writeTxtFile } from "../support/helpers";

/**
 * crawler function has three parameters that we can use
 * search: is an input in google search field
 * keyboardKey: is simulating press of Control or Cmd depending on the system that script is being run on and values are "Control" for Windows and "Meta" for MacOS
 * htmlTag: is a tag from which we extract text and depending on what we need we can write it "body", "div", or if we need class, href or some other attribute we write "[class]", "[id]"
 */

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

  //opens first link in a new tab, extracts the text data from html and creates a txt file with data extracted
  const firstResult = await google.openResultLink(0, keyboardKey, htmlTag);
  await writeTxtFile(0, firstResult);

  //opens second link in a new tab, extracts the text data from html and creates a txt file with data extracted
  const secondResult = await google.openResultLink(1, keyboardKey, htmlTag);
  await writeTxtFile(1, secondResult);

  //opens first link in a new tab, extracts the text data from html and creates a txt file with data extracted
  const thirdResult = await google.openResultLink(2, keyboardKey, htmlTag);
  await writeTxtFile(2, thirdResult);

  await browser.close();
})("Citroen C3", "Meta", "body");
