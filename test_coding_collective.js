// Selenium WebDriver test for Coding Collective homepage

const { Builder, By, until } = require('selenium-webdriver');

(async function testCodingCollective() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // 1. Open homepage
    await driver.get('https://codingcollective.com/');
    // Wait for the page to load and print the actual title
    await driver.sleep(5000); // Wait for 5 seconds for page to load
    let actualTitle = await driver.getTitle();
    console.log('Actual page title:', actualTitle);
    // Optionally, check if the title is not empty
    if (!actualTitle || actualTitle.trim() === '') {
      throw new Error('Page title is empty or not loaded');
    }

    // 2. Check main headline
    let headline = await driver.findElement(By.xpath("//*[contains(text(),'Your Partner In Technology Solutions & Outsourcing Management')]")).isDisplayed();
    console.log('Main headline displayed:', headline);

    // 3. Verify navigation links
    // Main menu links to test
    const mainMenus = [
      { text: 'About Us', url: 'about-us', featureSelector: 'h1' },
      { text: 'For Businesses', url: 'for-businesses', featureSelector: 'h1' },
      { text: 'For Talents', url: 'for-talents', featureSelector: 'h1' },
      { text: 'Our Tech Community', url: 'our-tech-community', featureSelector: 'h1' },
      { text: 'Blog', url: 'blog.codingcollective.com', featureSelector: 'h1' },
      { text: 'Contact Us', url: 'contact-us', featureSelector: 'form, h1' }
    ];
    for (const menu of mainMenus) {
      let link = await driver.findElement(By.linkText(menu.text));
      let displayed = await link.isDisplayed();
      console.log(`Menu link '${menu.text}' displayed:`, displayed);
      // Scroll into view before clicking
      await driver.executeScript("arguments[0].scrollIntoView(true);", link);
      await driver.sleep(500); // Wait for scroll
      try {
        await link.click();
      } catch (err) {
        // Retry with JS click if intercepted
        await driver.executeScript("arguments[0].click();", link);
      }
      await driver.sleep(2000); // Wait for navigation
      let currentUrl = await driver.getCurrentUrl();
      console.log(`Clicked '${menu.text}', current URL:`, currentUrl);
      // Try to interact with a feature/section inside the page
      try {
        let feature = await driver.findElement(By.css(menu.featureSelector));
        let featureDisplayed = await feature.isDisplayed();
        let featureText = await feature.getText();
        console.log(`Feature '${menu.featureSelector}' displayed:`, featureDisplayed, '| Text:', featureText);
      } catch (err) {
        console.log(`Feature '${menu.featureSelector}' not found or not visible on '${menu.text}' page.`);
      }
      // Go back to homepage for next menu
      await driver.get('https://codingcollective.com/');
      await driver.sleep(2000);
    }

    // 4. Check for key sections
    const sections = [
      'Introducing Coding Collective', 'IT Health Check', 'Company', 'Contact'
    ];
    for (const sectionText of sections) {
      let section = await driver.findElement(By.xpath(`//*[contains(text(),'${sectionText}')]`));
      let displayed = await section.isDisplayed();
      console.log(`Section '${sectionText}' displayed:`, displayed);
    }

    // 4a. Test carousel buttons in 'What People Say About Us'
    try {
      let carouselHeader = await driver.findElement(By.xpath("//*[contains(text(),'What People Say About us')]"));
      await driver.executeScript("arguments[0].scrollIntoView(true);", carouselHeader);
      await driver.sleep(1000);
      // Find carousel navigation buttons by class
      let nextBtn = await driver.findElement(By.css('.bdt-navigation-next.bdt-slidenav-next'));
      let prevBtn = await driver.findElement(By.css('.bdt-navigation-prev.bdt-slidenav-previous'));
      if (await nextBtn.isDisplayed()) {
        await nextBtn.click();
        console.log("Carousel 'Next' button clicked successfully.");
        await driver.sleep(1000);
      }
      if (await prevBtn.isDisplayed()) {
        await prevBtn.click();
        console.log("Carousel 'Prev' button clicked successfully.");
        await driver.sleep(1000);
      }
    } catch (err) {
      console.log("Carousel navigation buttons not found or not clickable.");
    }

    // 4b. Test FAQ expand/collapse buttons in 'Frequently Asked Questions'
    try {
      let faqHeader = await driver.findElement(By.xpath("//*[contains(text(),'Frequently Asked Questions')]"));
      await driver.executeScript("arguments[0].scrollIntoView(true);", faqHeader);
      await driver.sleep(1500); // Wait longer for dynamic content
      // Scroll to the accordion container
      let faqContainer = await driver.findElement(By.css('.bdt-ep-accordion-container'));
      await driver.executeScript("arguments[0].scrollIntoView(true);", faqContainer);
      await driver.sleep(1500);
      // Wait for accordion titles to be present
      let faqTitles = await driver.findElements(By.css('.bdt-ep-accordion-title'));
      let count = 0;
      for (let title of faqTitles) {
        if (await title.isDisplayed()) {
          await title.click();
          console.log(`FAQ accordion ${count + 1} clicked.`);
          await driver.sleep(700);
          count++;
        }
        if (count >= 3) break; // Only test first 3 for brevity
      }
      if (count === 0) {
        console.log("No FAQ accordion titles found or clickable.");
      }
    } catch (err) {
      console.log("FAQ section or accordion titles not found.");
    }

    // 4c. Test blog post navigation on blog.codingcollective.com
    try {
      await driver.get('https://blog.codingcollective.com/');
      await driver.sleep(2000);
      let firstReadMore = await driver.findElement(By.xpath("//a[contains(text(),'Read more')]") );
      await driver.executeScript("arguments[0].scrollIntoView(true);", firstReadMore);
      await driver.sleep(500);
      await firstReadMore.click();
      await driver.sleep(2000);
      let postUrl = await driver.getCurrentUrl();
      let postTitle = await driver.findElement(By.css('h1, h2')).getText();
      console.log(`Blog post opened: ${postUrl} | Title: ${postTitle}`);
      // Go back to homepage
      await driver.get('https://codingcollective.com/');
      await driver.sleep(2000);
    } catch (err) {
      console.log("Blog post navigation test failed.");
    }

    // 5. Verify social media links
    const socialLinks = [
      { name: 'Facebook', url: 'facebook.com/codingcollective' },
      { name: 'LinkedIn', url: 'linkedin.com/company/codingcollective' },
      { name: 'Instagram', url: 'instagram.com/codingcollective.id/' }
    ];
    for (const social of socialLinks) {
      let link = await driver.findElement(By.css(`a[href*='${social.url}']`));
      let displayed = await link.isDisplayed();
      console.log(`${social.name} link displayed:`, displayed);
    }

    // 6. Check footer
    let footer = await driver.findElement(By.xpath("//*[contains(text(),'© 2025 Coding Collective | All Rights Reserved')]")).isDisplayed();
    console.log('Footer displayed:', footer);

  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await driver.quit();
  }
})();
