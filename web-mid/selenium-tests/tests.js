const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Secure Nest Application Tests', function () {
    let driver;
    let baseUrl;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        // Try ports starting from 5173 up to 5183
        for (let port = 5173; port <= 5183; port++) {
            try {
                await driver.get(`http://localhost:${port}`);
                // If we can access the page, this is our base URL
                baseUrl = `http://localhost:${port}`;
                break;
            } catch (error) {
                continue;
            }
        }
        if (!baseUrl) {
            throw new Error('Could not find running application on any port between 5173-5183');
        }
    });

    after(async function () {
        await driver.quit();
    });

    // Test Case 1: Home Page Navigation
    it('should navigate to home page and display main content', async function () {
        await driver.get(baseUrl);
        const homeContent = await driver.findElement(By.css('.container.mx-auto'));
        assert.ok(await homeContent.isDisplayed());

        // Verify welcome message
        const welcomeText = await driver.findElement(By.css('h1.text-4xl')).getText();
        assert.ok(welcomeText.includes('Welcome to Secure Nest'));
    });

    // Test Case 2: Navigation Menu
    it('should have working navigation links', async function () {
        await driver.get(baseUrl);
        const navLinks = await driver.findElements(By.css('nav a'));
        const expectedLinks = ['Home', 'Residents', 'Visitors', 'About'];

        for (let i = 0; i < navLinks.length; i++) {
            const linkText = await navLinks[i].getText();
            assert.ok(expectedLinks.includes(linkText));
        }
    });

    // Test Case 3: Residents Page
    it('should display residents list and allow filtering', async function () {
        await driver.get(`${baseUrl}/residents`);
        const residentsContainer = await driver.findElement(By.css('.container.mx-auto'));
        assert.ok(await residentsContainer.isDisplayed());

        // Verify page title
        const pageTitle = await driver.findElement(By.css('h1.text-3xl')).getText();
        assert.ok(pageTitle.includes('Resident Management'));
    });

    // Test Case 4: Visitors Page
    it('should handle visitor registration', async function () {
        await driver.get(`${baseUrl}/visitors`);
        const visitorForm = await driver.findElement(By.css('form'));
        assert.ok(await visitorForm.isDisplayed());

        // Test form submission
        await driver.findElement(By.css('input[name="name"]')).sendKeys('Test Visitor');
        await driver.findElement(By.css('input[name="toVisit"]')).sendKeys('Test Resident   ');
        await driver.findElement(By.css('input[name="purpose"]')).sendKeys('Meeting');
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Verify success message
        await driver.wait(until.elementLocated(By.css('.success-message')), 5000);
    });

    // Test Case 5: About Page
    it('should display about page information', async function () {
        await driver.get(`${baseUrl}/about`);
        const aboutHeading = await driver.findElement(
            By.css('h2.text-2xl.font-semibold.mb-2')
        );
    
        assert.ok(await aboutHeading.isDisplayed());
    });

    // Test Case 6: Responsive Design
    it('should adapt to mobile viewport', async function () {
        await driver.get(baseUrl);
        await driver.manage().window().setRect({ width: 375, height: 812 });
        const navMenu = await driver.findElement(By.css('nav.bg-blue-600'));
        assert.ok(await navMenu.isDisplayed());
    });

    // Test Case 7: Form Validation
    it('should validate visitor registration form', async function () {
        await driver.get(`${baseUrl}/visitors`);
        await driver.findElement(By.css('button[type="submit"]')).click();
        const errorMessages = await driver.findElements(By.css('.error-message'));
        assert.ok(errorMessages.length > 0);
    });

    // Test Case 8: Feature Cards
    it('should display feature cards on home page', async function () {
        await driver.get(baseUrl);
        const featureCards = await driver.findElements(By.css('.grid.grid-cols-1.md\\:grid-cols-3 > div'));
        assert.strictEqual(featureCards.length, 3);

        // Verify card content
        const cardTitles = await Promise.all(featureCards.map(card =>
            card.findElement(By.css('h2.text-xl')).getText()
        ));
        assert.ok(cardTitles.includes('Resident Management'));
        assert.ok(cardTitles.includes('Visitor Tracking'));
        assert.ok(cardTitles.includes('Security First'));
    });

    // Test Case 9: Call to Action
    it('should display call to action section', async function () {
        await driver.get(baseUrl);
        const ctaSection = await driver.findElement(By.css('.bg-blue-50'));
        assert.ok(await ctaSection.isDisplayed());

        const ctaButton = await driver.findElement(By.css('.bg-blue-600.text-white'));
        assert.ok(await ctaButton.isDisplayed());
        assert.strictEqual(await ctaButton.getText(), 'Get Started');
    });

    // Test Case 10: Navigation Brand
    it('should display correct brand name', async function () {
        await driver.get(baseUrl);
        const brandName = await driver.findElement(By.css('nav .font-bold')).getText();
        assert.strictEqual(brandName, 'Secure Nest');
    });
}); 