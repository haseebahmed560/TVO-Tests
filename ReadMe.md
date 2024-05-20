# TVO Learn Selenium Test Suite

## Overview
This project contains automated tests for the TVO Learn website using Selenium WebDriver and Java Script.

## Test Approach
- **Navigation and Interaction**: Ensure correct navigation and interaction.
- **Content Validation**: Verify visible content.
- **Functional Validation**: Check functionality like page redirects and element visibility.

## Test Cases
1. Navigate to TVO Learn homepage.
2. Open "Learning Resources (K-12)" dropdown.
3. Select a grade level (e.g., Grade 6).
4. Verify the URL contains the selected grade.
5. Click on a card within the "Learn Forward in the Curriculum" section.
6. Verify the url for the subject.
7. Verify to see if other subjects can be selected.
8. Verify to see FAQ Tab can be selected
9. Verify Terms and use tab can be selected
10. Verify all cards in the "Learn Forward in the Curriculum" section have valid links.

## Execution
To run the tests, execute the following command in bash:
node tests.js


Assumption is that node.js is installed already if not perform these steps:

npm init -y
npm install selenium-webdriver
npm install chromedriver
