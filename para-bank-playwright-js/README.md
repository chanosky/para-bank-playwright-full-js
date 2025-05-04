## 📘 Para Bank Playwright Automation (JavaScript)

This project contains a complete end-to-end testing framework using **Playwright** for automating functional flows of the Para Bank application. It includes UI tests and integrates modular page objects for maintainability.

----------

### 📁 Project Structure

para-bank-playwright-js/  
├── node_modules/ # Installed node modules  
├── pages/ # Page Object Models for the app  
│ ├── AccountPage.js  
│ ├── BillPayPage.js  
│ ├── HomePage.js  
│ ├── LoginPage.js  
│ ├── RegisterPage.js  
│ └── TransferPage.js  
├── playwright-report/ # Playwright HTML reports output  
├── test-results/ # Test output in raw format (JSON)  
├── tests/ # Spec files (end-to-end tests)  
│ └── paraBank.e2e.spec.js  
├── utils/ # Utility/helper functions  
├── package.json # Project metadata and scripts  
├── package-lock.json # Dependency lock file  
├── playwright.config.js # Playwright configuration file  
└── README.md # Project documentation (you are here)

----------

### ✅ Prerequisites

Before running the tests, ensure the following are installed:

-   [Node.js (v18+)](https://nodejs.org/)
    
-   npm (comes with Node.js)
    
-   Git (optional, for version control)
    

----------

### ⚙️ Setup Instructions

1.  **Clone the repository**

    `git clone https://github.com/chanosky/para-bank-playwright-full-js.git cd para-bank-playwright-js` 
    
2.  **Install dependencies**
    
    `npm install` 
    
3.  **Install Playwright browsers**
    
    `npx playwright install` 
    

----------

### 🚀 How to Run Tests

Run all end-to-end tests with the following command:

`npx playwright test` 

To open the generated HTML report after test execution:

`npx playwright show-report` 

You can also run a specific test file:

`npx playwright test tests/paraBank.e2e.spec.js` 

To run in headed mode (with visible browser):

`npx playwright test --headed` 

Or in debug mode:

`npx playwright test --debug` 

----------

### 🧪 Writing Tests

-   Place all new test files in the `tests/` directory.
    
-   Create or extend corresponding **Page Object classes** inside the `pages/` directory.
    
-   Use the `utils/` folder to define any shared functionality (e.g., date utilities, input formatters).
    
-   Each Page Object contains:
    
    -   Page-specific actions (login, transfer funds, etc.)
    
----------

### Bugs and issues found

1.  We cannot test API test scenario 1, because the Para Bank app API "Find Transactions" will yield an internal server error if you placed the amount paid in the Pay Bill step. The only thing we can test is the Transfer Fund step. I tested this using Postman and I always encounter this issue.

### Focus

1. Due to time constraints, this automation framework only focuses on the E2E flow from Registering a User up to the Pay Bill step. Any other flows not related to this are disregarded for now. (e.g Negative testing, Performance testing, Cross Browser testing).

2. Used faker library to dynamically create test data.

3. Added console logs to check what is happening while the script is running.
