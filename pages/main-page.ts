import { expect, type Locator, type Page } from "@playwright/test";
import { DonationForm } from "./donation-form";
const { test } = require("@playwright/test");
import { allure } from "allure-playwright";

export class MainPage {
  readonly page: Page;
  readonly getButtonGiveMe: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getButtonGiveMe = page
      .frameLocator('iframe[title="Donate Button"]')
      .locator('div[class="button-hover-bg"]');
  }

  async goto() {
    await allure.step("Go to page DonationForm", async () => {
      await this.page.goto("https://data.fundraiseup.com/qa-test-7R58U3/");
    });
  }

  async clickGiveMeButton() {
    return await allure.step('Click "Give Me" button', async () => {
      await this.getButtonGiveMe.click();
      return new DonationForm(this.page);
    });
  }
}
