# Playwright-POM-Framework
This repositroy describes Playwright POM Framework
```
To run this framework, you can run following command in terminal -
npm run login
npm run cart
npm run invalid-login 

or

npx playwright test tests/login.spec.js
npx playwright test tests/cart.spec.js
npx playwright test tests/invalid-login.spec.js
```
```
If added new contents on csv then first run this command to convert contents from CSV to JSON - npm run convert

To view report - 
npx playwright show-report reports\19_06_2026__17_22_55\html-report
```
Project Overflow - 
```
npx playwright test
        ↓
playwright.config.js loads config
        ↓
tests/ folder scanned
        ↓
test script executes
        ↓
calls page objects (POM)
        ↓
uses test data + validation data
        ↓
utils (logger, helpers)
        ↓
browser actions executed
        ↓
results captured:
     ├── logs/
     ├── screenshots/
     ├── reports/
     └── test-results/
```
