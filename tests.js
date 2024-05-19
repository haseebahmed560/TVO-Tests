const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testTVO() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Test 1: Navigate to TVO Learn
        await driver.get('https://tvolearn.com');
        console.log('Test 1: Navigated to TVO Learn');

        // Test 2: Open "Learning Resources (K-12)" dropdown
        await driver.findElement(By.css('.header-dropdown')).click();
        await driver.wait(until.elementLocated(By.css('.grade-dropdown')), 5000);
        console.log('Test 2: Opened "Learning Resources (K-12)" dropdown');

        // Test 3: Select a Grade (e.g., Grade 1)
        await driver.findElement(By.xpath("//li[contains(text(), 'Grade 1')]")).click();
        await driver.wait(until.urlContains('/grade-1'), 5000);
        console.log('Test 3: Selected Grade 1');

        // Test 4: Verify URL contains /grade-1
        const url = await driver.getCurrentUrl();
        if (url.includes('/grade-1')) {
            console.log('Test 4: URL verification passed');
        } else {
            console.log('Test 4: URL verification failed');
        }

        // Test 5: Scroll to "Learn Forward in the Curriculum" section
        const learnForwardSection = await driver.findElement(By.id('learn-forward-curriculum'));
        await driver.executeScript("arguments[0].scrollIntoView();", learnForwardSection);
        console.log('Test 5: Scrolled to "Learn Forward in the Curriculum" section');

        // Test 6: Verify "Learn Forward in the Curriculum" section is visible
        const isVisible = await driver.executeScript("var elem = arguments[0],                 box = elem.getBoundingClientRect(),                 cx = box.left + box.width / 2,                 cy = box.top + box.height / 2,                 e = document.elementFromPoint(cx, cy); return e === elem;", learnForwardSection);
        if (isVisible) {
            console.log('Test 6: "Learn Forward in the Curriculum" section is visible');
        } else {
            console.log('Test 6: "Learn Forward in the Curriculum" section is not visible');
        }

        // Test 7: Click on a card within the "Learn Forward in the Curriculum" section
        const card = await driver.findElement(By.css('#learn-forward-curriculum .card'));
        await card.click();
        await driver.wait(until.urlContains('/subject/'), 5000);
        console.log('Test 7: Clicked on a card within the "Learn Forward in the Curriculum" section');

        // Test 8: Verify URL contains /subject/
        const newUrl = await driver.getCurrentUrl();
        if (newUrl.includes('/subject/')) {
            console.log('Test 8: URL verification passed');
        } else {
            console.log('Test 8: URL verification failed');
        }

        // Test 9: Verify all cards in the "Learn Forward in the Curriculum" section have valid links
        const cards = await driver.findElements(By.css('#learn-forward-curriculum .card'));
        let linksAreValid = true;
        for (const card of cards) {
            const href = await card.getAttribute('href');
            if (!href.includes('/subject/')) {
                linksAreValid = false;
                break;
            }
        }
        if (linksAreValid) {
            console.log('Test 9: All cards have valid links');
        } else {
            console.log('Test 9: Some cards have invalid links');
        }
    } catch (err) {
        console.error(err);
    } finally {
        // Close browser
        await driver.quit();
    }
})();