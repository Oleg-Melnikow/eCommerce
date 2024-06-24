# eCommerce

Welcome to our eCommerce website project repository!  
eCommerce is a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence.

## Purpose:

---

The purpose of our project is to create a user-friendly and visually appealing e-commerce platform that provides customers with a seamless shopping experience. We create the best process for viewing products, adding them to cart, and completing your purchase.

An important aspect of our application is that it's responsive 📲, ensuring it looks great on various devices with a minimum resolution of 380px. This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

Key pages in the application include:

- Login and Registration pages 🖥️
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

The website is built as a Single Page Application (SPA) using React.js and bundled with Webpack.

<br>

## Project Technology Stack:

---

- Frontend:

  - Framework: React
  - Programming Language: TypeScript
  - Bundler: Webpack
  - Linter: ESLint
  - Formatter: Prettier

- Backend:

  - External API: CommerceTools API (for data retrieval)

- Testing:

  - Test Runner: Jest

- Other Tools:

  - Git Hooks: Husky
  - Version Control System: Git
  - Git Hosting: GitHub

  <br>

## Configure scripts

---

### 1.1 Commands:

```json
  "start": "webpack-dev-server --config webpack.dev.js --open",
  "build": "webpack --config webpack.prod.js",
  "prettier": "npx prettier --check src/**/*.{js,jsx,ts,tsx,json,css,scss,md}",
  "prettier:fix": "npx prettier --write src/**/*.{js,jsx,ts,tsx,json,css,scss,md}",
  "lint": "tsc --noEmit && eslint src/**/*.ts{,x}",
  "lint:fix": "tsc --noEmit && eslint src/**/*.ts{,x} --fix",
  "test": "jest --watch",
  "coverage": "jest --coverage",
  "precommit": "npm run prettier:fix && npm run lint"
```

### 1.2 Commands Discription:

- `start` - this script runs configuration from `webpack.dev.js` file from the root folder and and will start a server instance and begin listening for connections from localhost on port 3000.
- `build` - this script runs configuration from `webpack.prod.js` and create bundle for this application and adds it in folder `dist` in root derictory.
- `prettier` - this script will run prettier from the root folder and check format errors.
- `prettier:fix` - this script will run prettier from the root folder and auto fix format errors.
- `lint` - this script runs eslint from the root folder and checks that we don't have any warning.
- `lint:fix` - this script runs eslint from the root folder and auto fix error and checks that we don't have any warning.
- `test` - this script watch files for changes and rerun all tests when something changes.
- `coverage` - this script checking code coverage.
- `precommit` - this script run `prettier` and `eslint` from the root folder.

<br>

## Install and Run the Application

---

#### To use the eCommerce application follow these steps:

- clone the repository with help commant `git clone git@github.com:Oleg-Melnikow/eCommerce.git`
- go to folder with clone project `cd .\eCommerce`
- switch to delevop branch use this commant in terminal IDE `git branch develop`
- install the dependencies with `npm i`
- start the local server using `npm run start`

#### The application runs on port 3000.
