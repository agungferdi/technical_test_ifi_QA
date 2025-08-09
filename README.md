# technical_test_ifi_QA

This repository contains automated QA test scripts for the Coding Collective website, created for a technical test.

## Purpose
Automate end-to-end testing of the main features and navigation of https://codingcollective.com/ using Selenium WebDriver with Node.js. All tests are implemented in a single file: `test_coding_collective.js`.

## Tech Stack
- Node.js
- Selenium WebDriver (with Chrome)
- JavaScript

## Folder Structure
- `test_homepage.js` — Tests homepage features (carousel, FAQ, footer)
- `test_aboutus.js` — Tests About Us page (headline, talents, all "Learn More" buttons, footer)
- `test_forbusinesses.js`, `test_fortalents.js`, `test_techcommunity.js`, `test_blog.js`, `test_contactus.js` — Individual tab tests
- `.gitignore` — Ignores `node_modules`, `.env`, logs, and system files

## How to Run
1. Install dependencies:
   ```sh
   npm install selenium-webdriver
   ```
2. Make sure Chrome is installed on your system.
3. Run the test file with Node.js:
   ```sh
   node test_coding_collective.js
   ```
4. Review the console output for test results and navigation logs.

## Documentation
To view the detailed test documentation, please download and open the PDF file:

`Muhammad Agung Ferdiansyah_IFI QA Test_.pdf`

## Notes
- All automated tests are implemented in a single script: `test_coding_collective.js`.
- Make sure your installed Chrome browser is compatible with Selenium WebDriver and ChromeDriver (auto-download is supported).
- The `.gitignore` file ensures that `node_modules`, environment files, logs, and system files are not tracked in git.

## Author
agungferdi
