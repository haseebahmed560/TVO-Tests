const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testTVO() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        // Test 1: Navigate to TVO Learn
        await driver.get('https://tvolearn.com');
        console.log('Test 1: Navigated to TVO Learn');

        // Ensure the page is fully loaded
        //await driver.wait(until.elementLocated(By.css('body')), 10000);

        // Test 2: Open "Learning Resources (K-12)" dropdown
        const dropdownXPath = '//li[1]/button/span';
        await driver.wait(until.elementLocated(By.xpath(dropdownXPath)), 10000);
        await driver.findElement(By.xpath(dropdownXPath)).click();
        console.log('Test 2: Opened "Learning Resources (K-12)" dropdown');

        // Test 3: Select a Grade (e.g., Grade 6)
        const gradeXPath = '//a[contains(@href, "grade-6")]';
        await driver.wait(until.elementLocated(By.xpath(gradeXPath)), 10000);
        await driver.findElement(By.xpath(gradeXPath)).click();
        await driver.wait(until.urlContains('/grade-6'), 10000);
        console.log('Test 3: Selected Grade 6');

        // Test 4: Verify URL contains /grade-6
        const url = await driver.getCurrentUrl();
        if (url.includes('/grade-6')) {
            console.log('Test 4: URL verification passed');
        } else {
            console.log('Test 4: URL verification failed');
        }

        // Test 5: Scroll to "Learn Forward in the Curriculum" section

        driver.executeScript('window.scrollBy(0, 500)');

        const Element = driver.findElement(By.xpath('/html/body/div[4]/main/div[2]/div[3]/div/div/div[2]/div[1]/div'));

        // Scrolling down the page till the element is found		
        await driver.executeScript("arguments[0].scrollIntoView();", Element);

        console.log('Test 5: Scrolled to "Learn Forward in the Curriculum" section');

       
    } catch (err) {
        console.error(err);
    } finally {
        // Close browser
        await driver.quit();
    }
})();
