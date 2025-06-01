# Inscale Automation

This project uses [Playwright](https://playwright.dev/) for end-to-end testing of the GlobalSQA AngularJS Banking Project.

## Project Structure

- `pom/` - Page Object Model classes
- `tests/` - Test cases to be executed
- `test-data/` - Test data in JSON format
- `playwright.config.js` - Playwright configuration

## Setup

1. **Install dependencies:**

   npm install

2. **Run Tests:**

    npx playwright test

3. **View HTML report:**
    npx playwright show-report