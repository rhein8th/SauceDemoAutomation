# SauceDemoAutomation
SauceDemoAutomation – Cypress Test Framework

📌 Overview
This is a Cypress automation test framework for SauceDemo, an e-commerce web application designed for UI and functional testing.
The framework follows the Page Object Model (POM) for better test structure and maintainability.

🛠️ Tech Stack
Test Framework: Cypress
Assertion Library: Chai (built into Cypress)
Test Runner: Mocha (built into Cypress)
Version Control: Git

🎯 Features & Test Scenarios
✔ Login Tests → Valid & invalid login attempts
✔ Product Tests → Add/remove items, sort products
✔ Cart Tests → Verify items in the cart
✔ Checkout Tests → Complete purchase flow
✔ UI Tests → Verify buttons, images, and responsiveness

🏗️ Project Structure (POM-Based)
📂 cypress/

 ┣ 📂 e2e/                  # Test-related files
 
 ┃ ┣ 📂 pages/              # Page Object Model (POM) classes
 
 ┃ ┣ 📂 sharedComponents/   # Shared Components classes
 
 ┃ ┗ 📂 tests/              # Test cases organized by feature
 
 ┣ 📂 fixtures/             # Test data (e.g., user credentials)
 
 ┣ 📂 support/
 
 ┃ ┣ 📂 commands.js         # Custom Cypress commands
 
 ┃ ┗ 📂 index.js            # Global configurations
 
 ┣ 📂 plugins/              # Cypress plugins  
 
📄 cypress.config.js        # Cypress configuration file  
📄 package.json             # Dependencies & scripts  

🚀 Installation & Setup

1️⃣ Clone the Repository:
git clone https://github.com/rhein8th/SauceDemoAutomation.git
cd SauceDemoAutomation

2️⃣ Install Dependencies:
npm install

3️⃣ Run Cypress Tests:
Open Cypress UI:
npx cypress open

Run in Headless Mode:
npx cypress run

🔗 Resources
Cypress Documentation
SauceDemo Website

