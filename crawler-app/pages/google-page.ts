import { Page, Locator } from "@playwright/test";

export default class GoogleSearch {
  readonly page: Page;

  readonly btnSearch: Locator;
  readonly inputSearch: Locator;
  readonly resultLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnSearch = page.locator('[name="btnK"]');
    this.inputSearch = page.locator('[name="q"]');
    this.resultLink = page.locator("span a[jsname][href] h3[class]");
  }

  async searchGoogle(input: string) {
    this.inputSearch.fill(input);
    this.btnSearch.first().click();
  }

  async openResultLink(
    pageIndex: number,
    keyboardKey: string,
    htmlTag: string
  ) {
    await this.page.keyboard.down(keyboardKey);
    await this.resultLink.nth(pageIndex).click();
    await this.page.keyboard.up(keyboardKey);

    const tabs: Page[] = [];
    const jsonParsed: string[] = [];

    const tabPromise = this.page.context().waitForEvent("page");
    tabs[pageIndex] = await tabPromise;
    await tabs[pageIndex].waitForLoadState();
    const htmlContent = await tabs[pageIndex].innerText(htmlTag);
    jsonParsed[pageIndex] = JSON.parse(JSON.stringify(htmlContent));
    return jsonParsed[pageIndex];
  }
}
