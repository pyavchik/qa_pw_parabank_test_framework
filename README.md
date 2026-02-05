# Task Description

To see the description of the task assignment [follow the link](https://github.com/mate-academy/qa_pw_parabank_test_framework/blob/main/TaskDescription.md). 

# Repository Overview

This repository contains a test automation framework for the [Parabank](https://parabank.parasoft.com/parabank/index.htm) bank application testing. 

# How to use this project

## Installation steps

To install the project follow the next steps:

1. Install Node.js.
2. Run the installation command in the project root.:
```bash
npm ci
```
3. Run the browsers installation in the project root.
```bash
npx playwright install
```
4. Install Allure commandline tool (Allure requires Java 8 or higher).
```bash
npm install -g allure-commandline
```

## How to run the tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode (browser visible):

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/notLoggedIn/auth/register.spec.js
```

Run tests matching a pattern:

```bash
npx playwright test -g "register"
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

## How to generate report

Generate Allure report after running tests:

1. Run tests to produce Allure results:
```bash
npx playwright test
```

2. Generate and open the Allure report:
```bash
allure generate allure-results --clean -o allure-report && allure open allure-report
```

Or generate report only (without opening):
```bash
allure generate allure-results --clean -o allure-report
```

View existing report:
```bash
allure open allure-report
``` 
