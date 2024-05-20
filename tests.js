const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Ansynchronous Function for Automated Tests
(async function testTVO() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        // Test 1: Navigate to TVO Learn
        await driver.get('https://tvolearn.com');
        console.log('Test 1: Navigated to TVO Learn');


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

        //Scroll to "Learn Forward in the Curriculum" section
        driver.executeScript('window.scrollBy(0, 500)');
        console.log('Scrolled to "Learn Forward in the Curriculum" section');


        // Test 5: Click on a card within the "Learn Forward in the Curriculum" section
        const cardXPath = '//a[contains(@href, "/pages/grade-6-language")]';
        const card = await driver.findElement(By.xpath(cardXPath));
        await card.click();
        await driver.wait(until.urlContains('grade-6-language'), 10000);
        console.log('Test 5: Clicked on a card within the "Learn Forward in the Curriculum" section');

        // Test 6 : Verify URL contains /grade6-language/
        const newUrl = await driver.getCurrentUrl();
        if (newUrl.includes('grade-6-language')) {
            console.log('Test 6: URL verification passed');
        } else {
            console.log('Test 6: URL verification failed');
        }

        
        // Test 7 : Verify to see if other subjects can be selected
        driver.executeScript('window.scrollBy(0, 3000)');
        const oralcommunicationtabXPath = '//a[contains(@href, "/pages/grade-6-science-and-technology")]';
        const oralcommunicationtab = await driver.findElement(By.xpath(oralcommunicationtabXPath));
        await oralcommunicationtab.click();
        
        console.log('Test 7: Selected Grade 6 science-and-technology Tab');

        // Test 8 : Verify to see FAQ Tab can be selected
        driver.executeScript('window.scrollBy(0, 18000)');
        const grade6tab1XPath = '//a[contains(@href, "/pages/faq")]';
        const backtab = await driver.findElement(By.xpath(grade6tab1XPath));
        await backtab.click();
        
        console.log('Test 8: Selected FAQ Tab');


        // Test 9 : Verify Terms and use tab can be selected
        driver.executeScript('window.scrollBy(0, 18000)');
        const readingtabXPath = '//a[contains(@href, "/pages/terms-of-use")]';
        const readingtab = await driver.findElement(By.xpath(readingtabXPath));
        await readingtab.click();
        
        console.log('Test 9: Selected Grade 6 Tab');

      
        // Test 10: Verify all cards in the "Learn Forward in the Curriculum" section have valid links
        const cardsXPath = '//*[@id="learn-forward-curriculum"]//a[contains(@class, "card")]';
        const cards = await driver.findElements(By.xpath(cardsXPath));
        let linksAreValid = true;
        for (const card of cards) {
            const href = await card.getAttribute('href');
            if (!href.includes('/pages/')) {
                linksAreValid = false;
                break;
            }
        }
        if (linksAreValid) {
            console.log('Test 10: All cards have valid links');
        } else {
            console.log('Test 10: Some cards have invalid links');
        }

       
    } catch (err) {
        console.error(err);
    } finally {
        // Close browser
        await driver.quit();
    }
})();
