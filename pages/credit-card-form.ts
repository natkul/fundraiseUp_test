import { expect, type Locator, type Page } from "@playwright/test";
import { PersonalInformation } from "./personal-information-form";
const { test } = require("@playwright/test");
import { allure } from "allure-playwright";

export class CreditCard {
  readonly page: Page;
  readonly topIframe: Locator;
  readonly getCardNumberField: Locator;
  readonly getSecurityField: Locator;
  readonly getCvcCode: Locator;
  readonly getContinueButton: Locator;
  readonly getError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topIframe = page
      .frameLocator('iframe[title="Donation Widget"]')
      .locator("body");
    this.getCardNumberField = this.topIframe
      .frameLocator('iframe[title*="Secure card"]')
      .locator('input[data-elements-stable-field-name="cardNumber"]');
    this.getSecurityField = this.topIframe
      .frameLocator('iframe[title="Secure expiration date input frame"]')
      .locator('input[data-elements-stable-field-name="cardExpiry"]');
    this.getCvcCode = this.topIframe
      .frameLocator('iframe[title="Secure CVC input frame"]')
      .locator('input[data-elements-stable-field-name="cardCvc"]');
    this.getContinueButton = this.topIframe.locator(
      'button[data-qa="card-continue"]'
    );
    this.getError = this.topIframe.locator(
      'p[data-qa="card-continue-error-message"]'
    );
  }

  async fillCreditCardField(value: string) {
    await allure.step(
      `Fill the "Card number" field with value: ${value}`,
      async () => {
        await this.getCardNumberField.click();
        await this.getCardNumberField.fill(value);
      }
    );
  }

  async fillSerucityField(value: string) {
    await allure.step(
      `Fill the "Secret code" field with value: ${value}`,
      async () => {
        await this.getSecurityField.click();
        await this.getSecurityField.fill(value);
      }
    );
  }

  async fillCvcCode(value: string) {
    await allure.step(
      `Fill the "CVC code" field with value: ${value}`,
      async () => {
        await this.getCvcCode.click();
        await this.getCvcCode.fill(value);
      }
    );
  }

  async clickContinueButton() {
    return await allure.step('Click on the "Continue" button', async () => {
      await this.getContinueButton.click();
      return new PersonalInformation(this.page);
    });
  }

  async checkError() {
    return await allure.step("Check for error", async () => {
      const element = await this.getError;
      const textContent = await element.textContent();
      return textContent;
    });
  }
}
