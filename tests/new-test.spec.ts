import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main-page";
import { TIMEOUT } from "dns";

const { faker } = require("@faker-js/faker");
const fakeFirstName = faker.person.firstName();
const fakeLastName = faker.person.lastName();
const fakeEmail =
  faker.person.firstName() + faker.person.lastName() + "@gmail.com";

test.describe.configure({ mode: "parallel" });

test("Donate monthly", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.goto();

  const donatForm = await mainPage.clickGiveMeButton();
  await donatForm.clickMonthlyTub();
  await donatForm.chooseCurrency();
  await donatForm.fillDonationPriceField("100");

  const payOption = await donatForm.clickDonateMonthlyButton();
  await payOption.uncheckCheckbox();

  const creditCard = await payOption.clickCreditCardButton();
  await creditCard.fillCreditCardField("4242 4242 4242 4242");
  await creditCard.fillSerucityField("04/24");
  await creditCard.fillCvcCode("000");

  const personalInfo = await creditCard.clickContinueButton();
  await personalInfo.fillFirstNameField(fakeFirstName);
  await personalInfo.fillLastNameField(fakeLastName);
  await personalInfo.fillEmailField(fakeEmail);
  await personalInfo.clickDonateButton();

  const message = await creditCard.checkError();
  expect(message).toBe(
    "Your card was declined. Your request was in live mode, but used a known test card."
  );

  await page.close();
});

test("Donate monthly copy", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.goto();

  const donatForm = await mainPage.clickGiveMeButton();
  await donatForm.clickMonthlyTub();
  await donatForm.chooseCurrency();
  await donatForm.fillDonationPriceField("100");

  const payOption = await donatForm.clickDonateMonthlyButton();
  await payOption.uncheckCheckbox();

  const creditCard = await payOption.clickCreditCardButton();
  await creditCard.fillCreditCardField("4242 4242 4242 4242");
  await creditCard.fillSerucityField("04/24");
  await creditCard.fillCvcCode("000");

  const personalInfo = await creditCard.clickContinueButton();
  await personalInfo.fillFirstNameField(fakeFirstName);
  await personalInfo.fillLastNameField(fakeLastName);
  await personalInfo.fillEmailField(fakeEmail);
  await personalInfo.clickDonateButton();

  const message = await creditCard.checkError();
  expect(message).toBe(
    "Your card was declined. Your request was in live mode, but used a known test card."
  );

  await page.close();
});
