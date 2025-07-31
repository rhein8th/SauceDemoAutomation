# 🚀 SauceDemoAutomation – Cypress Test Framework

A Cypress-based end-to-end testing framework for automating the UI and functionality of the [SauceDemo](https://www.saucedemo.com/) e-commerce web app. Built using the Page Object Model (POM) for clean, maintainable tests.

---

## 📌 Overview

This test framework is designed to:
- Validate key user flows (login, cart, checkout)
- Ensure UI responsiveness and correctness
- Be scalable, readable, and easy to maintain

---

## 🛠️ Tech Stack

| Tool             | Purpose                          |
|------------------|----------------------------------|
| **Cypress**      | Test automation framework        |
| **Mocha**        | Test runner (bundled with Cypress) |
| **Chai**         | Assertion library (bundled)      |
| **Mochawesome**  | Test reporting                   |
| **@cypress/grep**| Test filtering by tags or title  |
| **Git**          | Version control                  |

---

## 🎯 Features & Test Scenarios

- ✅ **Login Tests** – Valid & invalid login scenarios
- ✅ **Product Tests** – Add, remove, sort products
- ✅ **Cart Tests** – Cart verification and assertions
- ✅ **Checkout Tests** – Full checkout flow
- ✅ **UI Tests** – UI elements, responsiveness, visibility

---

## 🧱 Project Structure (POM-Based)

```text
📦 cypress/
 ┣ 📂 e2e/                # Entry point test files
 ┣ 📂 pages/              # Page Object Models
 ┣ 📂 sharedComponents/   # Reusable page components
 ┣ 📂 tests/              # Feature-specific tests
┣ 📂 fixtures/            # Static test data
┣ 📂 reports/             # Generated test reports
┣ 📂 support/
 ┃ ┣ 📜 commands.js       # Custom Cypress commands
 ┃ ┗ 📜 e2e.js            # Global setup/config
📜 cypress.config.js      # Cypress configuration
📜 package.json           # Project scripts & dependencies
```


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```text
git clone https://github.com/rhein8th/SauceDemoAutomation.git
cd SauceDemoAutomation
```

### 2️⃣ Install Dependencies
```text
npm install
```
---
### 🧪 Run Cypress Tests
Open Cypress Test Runner (UI Mode)
```text
npx cypress open
```

#### Run All Tests (Headless)
```text
npm test
```

### Run with Specific Browsers
```text
npm run chrome
npm run edge
npm run firefox
```

#### Filter Tests Using @cypress/grep (if installed)
```text
npx cypress run --env grepTags=@reg
npx cypress run --env grepTags=@smoke
npx cypress run --spec "cypress/e2e/tests/LoginTest.js" --env grepTags=@smoke
```

#### You can also combine grep with scripts:
```text
npx cypress run --browser chrome --env grep="Cart"
```
---
## 📊 Test Reporting (Mochawesome)
```text
Install mochawesome (if not yet):
npm install --save-dev mochawesome
```

### Run tests and generate reports:
```text
npx cypress run --reporter mochawesome
```
---
## 🔗 Resources
- [Cypress Documentation](https://docs.cypress.io)
- [SauceDemo Website](https://www.saucedemo.com/)
- [Udemy Cypress Course](https://www.udemy.com/course/cypress-tutorial/)
---
## 👨‍💻 Author
Maintained by [@rhein8th](https://github.com/rhein8th/)
