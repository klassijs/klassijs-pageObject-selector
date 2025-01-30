# klassijs Page Object Selector

## Overview
The `klassijs-pageObject-selector` function is designed to facilitate running a single scenario against multiple Page Object files. It enables streamlined testing across different page objects by dynamically selecting the appropriate one based on predefined conditions.

## Features
- Dynamically selects the correct Page Object file for a given test scenario.
- Supports multiple Page Object structures.
- Improves test reusability and maintainability.
- Reduces code duplication by centralizing Page Object management.

## Installation
Ensure you have Node.js and the necessary test framework installed (such as WebdriverIO, Cypress, or Playwright). Then, integrate the function within your test suite.

```bash
npm install
```

## Usage
### Importing the Function
```javascript
const pageObjectSelector = require('./path/to/page-object-selector');
```

### Selecting a Page Object
```javascript
const page = pageObjectSelector('LoginPage');
await page.open();
await page.login('username', 'password');
```

### Example Scenario
```javascript
describe('User Login', () => {
  it('should log in with valid credentials', async () => {
    const page = pageObjectSelector('LoginPage');
    await page.open();
    await page.login('testuser', 'password123');
    expect(await page.isLoggedIn()).toBe(true);
  });
});
```

## Configuration
Ensure that all your Page Objects are structured properly and stored in a designated directory.

Example:
```
/page-objects/
  ├── LoginPage.js
  ├── DashboardPage.js
  ├── ProfilePage.js
```

Modify the function to map scenario names to respective Page Objects.
```javascript
const pages = {
  LoginPage: require('./pageObjects/LoginPage'),
  DashboardPage: require('./pageObjects/DashboardPage'),
  ProfilePage: require('./pageObjects/ProfilePage'),
};

function pageObjectSelector(pageName) {
  if (!pages[pageName]) {
    throw new Error(`Page Object "${pageName}" not found.`);
  }
  return new pages[pageName]();
}
```

## Error Handling
- If an invalid Page Object name is passed, the function throws an error.
- Ensure all Page Objects follow a consistent structure to avoid runtime issues.

## Contributions
Feel free to submit issues or pull requests to improve the functionality.

## License
This project is licensed under the MIT License.

