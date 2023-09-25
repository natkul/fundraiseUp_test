import { expect, type Locator, type Page } from "@playwright/test";
const { faker } = require("@faker-js/faker");
const { test } = require("@playwright/test");
import { allure } from "allure-playwright";

export class PersonalInformation {
  readonly page: Page;
  readonly topIframe: Locator;
  readonly getFirstName: Locator;
  readonly getLastName: Locator;
  readonly getEmail: Locator;
  readonly getDonateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topIframe = page
      .frameLocator('iframe[title="Donation Widget"]')
      .locator("body");
    this.getFirstName = this.topIframe.locator(
      'input[data-qa="personal-first-name"]'
    );
    this.getLastName = this.topIframe.locator('input[data-qa="personal-last-name"]');
    this.getEmail = this.topIframe.locator('input[data-qa="personal-email"]');
    this.getDonateButton = this.topIframe.locator(
      'button[data-qa="privacy-continue"]'
    );
  }

  async fillFirstNameField(value) {
    await allure.step(
      `Fill the "Name" field with the value: ${value}`,
      async () => {
        await this.getFirstName.click();
        await this.getFirstName.fill(value);
      }
    );
  }

  async fillLastNameField(value) {
    await allure.step(
      `Fill the "Last Name" field with the value: ${value}`,
      async () => {
        await this.getLastName.click();
        await this.getLastName.fill(value);
      }
    );
  }

  async fillEmailField(value) {
    await allure.step(
      `Fill the "Email" field with the value: ${value}`,
      async () => {
        await this.getEmail.click();
        await this.getEmail.fill(value);
      }
    );
  }

  async clickDonateButton() {
    await allure.step('Click on the "Donate" button', async () => {
      await this.page.route(
        "**/api.fundraiseup.com/paymentSession/**",
        async (route) => {
          const json = [{ status: "200" }];
          await route.fulfill({ json });
        }
      );
      await this.getDonateButton.click();
    });
  }
}
