# How to Start a TypeScript Project Fast

For a simple TypeScript project where you want a library with code, tests, and a client to test it in the browser console, follow these steps for a **quick and efficient** setup:

---

## 1️⃣ Initialize the Project

Run the following in your terminal:

```sh
mkdir my-ts-project && cd my-ts-project
npm init -y
```

This will create a `package.json` file.

---

## 2️⃣ Install Dependencies

Run the following command to install the required dependencies:

```sh
npm install -D typescript ts-node jest ts-jest @types/jest vite
```

- **`typescript`** → Compiles TypeScript  
- **`ts-node`** → Runs TypeScript files in Node.js  
- **`jest`** → For unit testing  
- **`ts-jest`** → Jest preset for TypeScript  
- **`@types/jest`** → Type definitions for Jest  
- **`vite`** → A fast development server for testing in the browser  

---

## 3️⃣ Configure TypeScript

Generate a `tsconfig.json`:

```sh
npx tsc --init
```

Modify `tsconfig.json` to ensure compatibility with your setup:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",
    "outDir": "dist",
    "rootDir": "libs",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["libs/**/*"]
}
```

---

## 4️⃣ Create Project Structure

Run the following to create your directories and files:

```sh
mkdir libs tests client docs docs_pl
New-Item libs/battleship/index.ts -ItemType File
New-Item tests/index.test.ts -ItemType File
New-Item client/index.html -ItemType File
New-Item client/main.ts -ItemType File
```

Your folder structure should look like this:

```
my-ts-project
│── libs/
│   └── battleship/
│       └── index.ts      # Your library code
│── tests/
│   └── index.test.ts     # Jest tests
│── client/
│   ├── index.html        # Web interface for testing in browser
│   └── main.ts           # Browser script
│── docs/                 # Documentation folder
│── docs_pl               # (Optional, Polish documentation)
│── tsconfig.json
│── package.json
│── jest.config.js        # Jest config (optional)
```

---

## 5️⃣ Write Your Library Code (`libs/battleship/index.ts`)

Example function in your library:

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

---

## 6️⃣ Write Tests (`tests/index.test.ts`)

Basic Jest test for your library:

```ts
import { greet } from "../libs/battleship/index";

test("greet function", () => {
  expect(greet("Alice")).toBe("Hello, Alice!");
});
```

Run the tests with:

```sh
npx jest
```

---

## 7️⃣ Setup Client for Browser Testing

### HTML File (`client/index.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test TypeScript</title>
</head>
<body>
  <script type="module" src="./main.ts"></script>
</body>
</html>
```

### Client Script (`client/main.ts`):

```ts
import { greet } from "../libs/battleship/index";

console.log(greet("World")); // Check the browser console
```

---

## 8️⃣ Start the Browser Test Environment

Modify `package.json` to add scripts for building, testing, and running the client:

```json
"scripts": {
  "build": "tsc",
  "test": "jest",
  "dev": "vite client"
}
```

Start the client:

```sh
npm run dev
```

Now, open your browser, check the console (`F12` or `Ctrl+Shift+I`), and see the output!

---

### Additional Jest Configuration

In case you're using Jest with TypeScript, ensure you have the following Jest configuration (`jest.config.js`):

```js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  extensionsToTreatAsEsm: [".ts"],
};
```

To run the tests, execute:

```sh
npx jest
```

---

### 🎉 Done!

Now you have:
- A **library** (`libs/battleship/index.ts`)
- **Tests** (`tests/index.test.ts`)
- A **client** to test in the browser (`client/`)
- **Documentation** (`docs/` and `docs_pl/`)
