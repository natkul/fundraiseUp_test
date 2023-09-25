import { expect, type Locator, type Page } from "@playwright/test";
import { CreditCard } from "./credit-card-form";
const { test } = require("@playwright/test");
import { allure } from "allure-playwright";

export class PaymentOption {
  readonly page: Page;
  readonly topIframe: Locator;
  readonly getTransactionCosts: Locator;
  readonly getCreditCardButton: Locator;
  readonly getMessageAfterUncheck: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topIframe = page
      .frameLocator('iframe[title="Donation Widget"]')
      .locator("body");
    this.getTransactionCosts = this.topIframe.getByTestId("popover-fees");
    this.getCreditCardButton = this.topIframe.locator(
      'button[data-qa="cc-button"]'
    );
    this.getMessageAfterUncheck = this.topIframe.locator(
      'div[data-qa="cover-fee-tooltip"]'
    );
  }

  async uncheckCheckbox() {
    return await allure.step("Uncheck the checkbox", async () => {
      await this.getTransactionCosts.uncheck();
    });
  }

  async clickCreditCardButton() {
    return await allure.step('Click on the "Credit Card" button', async () => {
      await this.getCreditCardButton.click();
      return new CreditCard(this.page);
    });
  }
}
