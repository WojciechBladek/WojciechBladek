# Tests for skleptest.pl application

## GEN Shop Application

Repository: https://github.com/WojciechBladek/WojciechBladek/tree/main/Playwright

Follow instructions in app README

## Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- setup husky with: `npx husky install`
- prepare local env file: `cp .env-template .env`
- copy application main URL as value of `BASE_URL` variable in `.env` file

### Update framework

- install latest version of `npm i @playwright/test`
- install latest version of browsers `npx playwright install`
- check version `npx playwright --version`

## Use

Run all tests:

```
npx playwright test
```

Run all tests with tags:

```
npx playwright test --grep "@GEN-S1-01"
```

Run all tests without tags:

```
npx playwright test --grep-invert "@GEN-S1-01"
```

Repeat tests with value:

```
npx playwright test --grep "@@GEN-S2-01" --repeat-each=5
```

For more usage cases look in `package.json` scripts section.
