import { expect, type Locator, type Page, test } from "@playwright/test";
import { PaymentOption } from "./payment-option-form";
import { allure } from "allure-playwright";

export class DonationForm {
  readonly page: Page;
  readonly topIframe: Locator;
  readonly clickMonthly: Locator;
  readonly getCurrency: Locator;
  readonly getPriceField: Locator;
  readonly getSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topIframe = page
      .frameLocator('iframe[title="Donation Widget"]')
      .locator("body");
    this.clickMonthly = this.topIframe.locator(
      'button[data-tracking-element-name="monthlyPlan"]'
    );
    this.getCurrency = this.topIframe.locator(
      'select[class="currency-select-control"]'
    );
    this.getPriceField = this.topIframe.locator('input[data-qa="amount"]');
    this.getSubmitButton = this.topIframe.locator(
      'button[data-qa="donate-button"]'
    );
  }

  async clickMonthlyTub() {
    await allure.step('Click on the "Monthly" tab', async () => {
      await this.clickMonthly.click();
    });
  }

  async chooseCurrency() {
    return await allure.step('Select currency "USD"', async () => {
      const element = await this.getCurrency;
      await element.selectOption("USD");
    });
  }

  async fillDonationPriceField(value) {
    await allure.step(
      `Fill the "Donation Amount" field with the value: ${value}`,
      async () => {
        await this.getPriceField.click();
        await this.getPriceField.clear();
        await this.getPriceField.fill(value);
      }
    );
  }

  async clickDonateMonthlyButton() {
    return await allure.step(
      'Click on the "Donate monthly" button',
      async () => {
        await this.getSubmitButton.click();
        return new PaymentOption(this.page);
      }
    );
  }
}
