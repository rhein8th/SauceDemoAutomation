# SauceDemoAutomation
**SauceDemoAutomation – Cypress Test Framework**

## 📌 Overview

SauceDemoAutomation is a Cypress-based test framework designed for UI and functional testing of the SauceDemo e-commerce web application.

This framework follows the Page Object Model (POM) for better test structure and maintainability.

## 🛠️ Tech Stack

 * Test Framework: Cypress

 * Assertion Library: Chai (built into Cypress)

 * Test Runner: Mocha (built into Cypress)

 * Version Control: Git

## 🎯 Features & Test Scenarios

✔ Login Tests → Valid & invalid login attempts

✔ Product Tests → Add/remove items, sort products

✔ Cart Tests → Verify items in the cart

✔ Checkout Tests → Complete purchase flow

✔ UI Tests → Verify buttons and responsiveness


## 🏗️ Project Structure (POM-Based)

📂 cypress/

 ┃ ┣ 📂 e2e/                 # Test-related files

 ┃ ┣ 📂 pages/               # Page Object Model (POM) classes

 ┃ ┣ 📂 sharedComponents/    # Shared Components classes

 ┃ ┗ 📂 tests/               # Test cases organized by feature

 ┣ 📂 fixtures/              # Test data

 ┣ 📂 reports/               # Test reports (mochawesome)

 ┣ 📂 support/

 ┃ ┣ 📜 commands.js         # Custom Cypress commands

 ┃ ┗ 📜 e2e.js              # Global configurations

📜 cypress.config.js         # Cypress configuration file  

📜 package.json             # Dependencies & scripts 


## 🚀 Installation & Setup

### 1️⃣ Clone the Repository:

`git clone https://github.com/rhein8th/SauceDemoAutomation.git`

`cd SauceDemoAutomation`

### 2️⃣ Install Dependencies:

`npm install`

### 3️⃣ Run Cypress Tests:

* **Open Cypress UI:**

`npx cypress open`

* **Run in Headed Mode:**

`npx cypress run`

## 📊 Test Reporting

* **Install mochawesome for test reporting:**

`npm install --save-dev mochawesome`

* **Run tests with reporting:**

`npx cypress run --reporter mochawesome`


🔗 **Resources**

* [Cypress Documentation](https://docs.cypress.io/)
* [Udemy Cypress Course](https://www.udemy.com/course/cypress-tutorial/)
* [SauceDemo Website](https://www.saucedemo.com/)

