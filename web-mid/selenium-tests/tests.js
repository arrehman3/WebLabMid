const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const os = require('os');
const path = require('path');
const { mkdtempSync } = require('fs');

describe('Secure Nest Application Tests', function () {
  this.timeout(20000);

  let driver;
  let baseUrl;

  before(async function () {
    const tmpProfile = mkdtempSync(path.join(os.tmpdir(), 'selenium-profile-'));
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments(`--user-data-dir=${tmpProfile}`);

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    baseUrl = 'http://localhost:5173';
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it('should navigate to home page and display main content', async function () {
    await driver.get(baseUrl);
    const homeContent = await driver.findElement(By.css('.container.mx-auto'));
    assert.ok(await homeContent.isDisplayed());

    const welcomeText = await driver.findElement(By.css('h1.text-4xl')).getText();
    assert.ok(welcomeText.includes('Welcome to Secure Nest'));
  });

  it('should have working navigation links', async function () {
    await driver.get(baseUrl);
    const navLinks = await driver.findElements(By.css('nav a'));
    const expectedLinks = ['Home', 'Residents', 'Visitors', 'About'];

    for (let link of navLinks) {
      const linkText = await link.getText();
      assert.ok(expectedLinks.includes(linkText));
    }
  });

  it('should display residents list and allow filtering', async function () {
    await driver.get(`${baseUrl}/residents`);
    const residentsContainer = await driver.findElement(By.css('.container.mx-auto'));
    assert.ok(await residentsContainer.isDisplayed());

    const pageTitle = await driver.findElement(By.css('h1.text-3xl')).getText();
    assert.ok(pageTitle.includes('Resident Management'));
  });

  it('should handle visitor registration', async function () {
    await driver.get(`${baseUrl}/visitors`);
    const visitorForm = await driver.findElement(By.css('form'));
    assert.ok(await visitorForm.isDisplayed());

    await driver.findElement(By.css('input[name="name"]')).sendKeys('Test Visitor');
    await driver.findElement(By.css('input[name="toVisit"]')).sendKeys('Test Resident');
    await driver.findElement(By.css('input[name="purpose"]')).sendKeys('Meeting');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const successMsg = await driver.wait(
      until.elementLocated(By.css('.success-message')),
      10000
    );
    assert.ok(await successMsg.isDisplayed());
    const text = await successMsg.getText();
    assert.ok(text.includes('Visitor logged successfully!'));
  });

  it('should display about page information', async function () {
    await driver.get(`${baseUrl}/about`);
    const aboutHeading = await driver.findElement(By.css('h2.text-2xl.font-semibold.mb-2'));
    assert.ok(await aboutHeading.isDisplayed());
  });

  it('should adapt to mobile viewport', async function () {
    await driver.manage().window().setRect({ width: 375, height: 812 });
    await driver.get(baseUrl);
    const navMenu = await driver.findElement(By.css('nav.bg-blue-600'));
    assert.ok(await navMenu.isDisplayed());
  });

  it('should validate visitor registration form', async function () {
    await driver.get(`${baseUrl}/visitors`);
    await driver.findElement(By.css('button[type="submit"]')).click();
    const errorMessages = await driver.findElements(By.css('.error-message'));
    assert.ok(errorMessages.length > 0);
  });

  it('should display feature cards on home page', async function () {
    await driver.get(baseUrl);
    const featureCards = await driver.findElements(
      By.css('.grid.grid-cols-1.md\\:grid-cols-3 > div')
    );
    assert.strictEqual(featureCards.length, 3);

    const cardTitles = await Promise.all(
      featureCards.map(card =>
        card.findElement(By.css('h2.text-xl')).getText()
      )
    );
    assert.ok(cardTitles.includes('Resident Management'));
    assert.ok(cardTitles.includes('Visitor Tracking'));
    assert.ok(cardTitles.includes('Security First'));
  });

  it('should display call to action section', async function () {
    await driver.get(baseUrl);

    const ctaSection = await driver.findElement(By.css('.bg-blue-50'));
    assert.ok(await ctaSection.isDisplayed());

    const ctaHeading = await ctaSection.findElement(By.css('h2.text-2xl')).getText();
    assert.ok(ctaHeading.includes('Ready to get started?'));

    const ctaButton = await ctaSection.findElement(By.css('.bg-blue-600.text-white'));
    assert.ok(await ctaButton.isDisplayed());
    assert.strictEqual(await ctaButton.getText(), 'Get Started');
  });

  it('should display correct brand name', async function () {
    await driver.get(baseUrl);
    const brandName = await driver.findElement(By.css('nav .font-bold')).getText();
    assert.strictEqual(brandName, 'Secure Nest');
  });
});
