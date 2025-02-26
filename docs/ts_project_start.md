# How to start typescript project fast

For simple typescript project where i want a library with code, tests, and client to test it in browser console.

## [Source](https://chat.deepseek.com)

To start a simple TypeScript project quickly, you can follow these steps. This setup will include a library with code, tests, and a client to test it in the browser console.

### 1. Initialize the Project
First, create a new directory for your project and initialize it with `npm` or `yarn`.

```bash
mkdir my-typescript-project
cd my-typescript-project
npm init -y
```

### 2. Install TypeScript
Install TypeScript as a development dependency.

```bash
npm install --save-dev typescript
```

### 3. Initialize TypeScript Configuration
Generate a `tsconfig.json` file to configure TypeScript.

```bash
npx tsc --init
```

This will create a `tsconfig.json` file with default settings. You can customize it as needed, but the defaults are usually fine for a simple project.

### 4. Create the Project Structure
Create the following directory structure:

```
my-typescript-project/
├── src/
│   └── index.ts
├── test/
│   └── index.test.ts
├── client/
│   └── index.html
├── dist/
├── tsconfig.json
└── package.json
```

- `src/`: Contains your TypeScript source code.
- `test/`: Contains your test files.
- `client/`: Contains the HTML file to test your library in the browser.
- `dist/`: This is where the compiled JavaScript files will go.

### 5. Write Your Library Code
In `src/index.ts`, write your TypeScript code. For example:

```typescript
// src/index.ts
export function add(a: number, b: number): number {
    return a + b;
}
```

### 6. Write Tests
Install a testing framework like `Jest` and its TypeScript support.

```bash
npm install --save-dev jest ts-jest @types/jest
```

Create a `jest.config.js` file to configure Jest:

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

In `test/index.test.ts`, write your tests:

```typescript
// test/index.test.ts
import { add } from '../src/index';

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});
```

Add a test script to `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

Run your tests:

```bash
npm test
```

### 7. Create a Client to Test in the Browser
In `client/index.html`, create a simple HTML file to test your library in the browser:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeScript Library Test</title>
</head>
<body>
    <script src="../dist/index.js"></script>
    <script>
        // Test your library in the browser console
        console.log('1 + 2 =', add(1, 2));
    </script>
</body>
</html>
```

### 8. Compile TypeScript to JavaScript
Add a build script to `package.json`:

```json
"scripts": {
  "build": "tsc",
  "test": "jest"
}
```

Run the build script to compile your TypeScript code to JavaScript:

```bash
npm run build
```

This will generate the compiled JavaScript files in the `dist/` directory.

### 9. Serve the Client
You can use a simple HTTP server to serve the `client/index.html` file. For example, you can use `http-server`:

```bash
npm install --save-dev http-server
```

Add a script to `package.json` to serve the client:

```json
"scripts": {
  "build": "tsc",
  "test": "jest",
  "serve": "http-server client"
}
```

Run the serve script:

```bash
npm run serve
```

Open your browser and navigate to `http://localhost:8080` to test your library in the browser console.

### 10. (Optional) Watch for Changes
If you want to automatically recompile your TypeScript code when changes are made, you can use the `--watch` flag:

```json
"scripts": {
  "build": "tsc",
  "watch": "tsc --watch",
  "test": "jest",
  "serve": "http-server client"
}
```

Run the watch script:

```bash
npm run watch
```

Now, whenever you make changes to your TypeScript files, they will be automatically recompiled.

### Summary
- **Project Initialization**: `npm init -y`
- **Install TypeScript**: `npm install --save-dev typescript`
- **Initialize TypeScript Config**: `npx tsc --init`
- **Project Structure**: Create `src/`, `test/`, `client/`, and `dist/` directories.
- **Write Library Code**: `src/index.ts`
- **Write Tests**: Install Jest and write tests in `test/index.test.ts`
- **Create Client**: `client/index.html`
- **Compile TypeScript**: `npm run build`
- **Serve Client**: `npm run serve`
- **Watch for Changes**: `npm run watch`

This setup should give you a fast and simple TypeScript project with a library, tests, and a client to test it in the browser console.

## [Source](https://chatgpt.com/)

If you want to set up a simple TypeScript project quickly with:  

✅ A **library** (your core logic)  
✅ **Tests** (to verify your code)  
✅ A **client** (to run & test in the browser console)  

Here’s a **quick and efficient** setup:

---

### **1️⃣ Initialize the Project**
Run the following in your terminal:

```sh
mkdir my-ts-project && cd my-ts-project
npm init -y
```

This creates a `package.json` file.

---

### **2️⃣ Install Dependencies**
Run:

```sh
npm install -D typescript ts-node jest @types/jest vite
```

- **`typescript`** → Compiles TypeScript  
- **`ts-node`** → Runs TypeScript files in Node.js  
- **`jest`** → For unit testing  
- **`@types/jest`** → Type definitions for Jest  
- **`vite`** → A fast development server for testing in the browser  

---

### **3️⃣ Configure TypeScript**
Generate a `tsconfig.json`:

```sh
npx tsc --init
```

Modify `tsconfig.json` to ensure compatibility:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

### **4️⃣ Create Project Structure**
Run:

```sh
mkdir src tests client
New-Item src/index.ts -ItemType File
New-Item tests/index.test.ts -ItemType File
New-Item client/index.html -ItemType File
New-Item client/main.ts -ItemType File
```

Your folder structure should look like this:

```
my-ts-project
│── src/
│   └── index.ts      # Your library code
│── tests/
│   └── index.test.ts # Jest tests
│── client/
│   ├── index.html    # Web interface for testing in browser
│   └── main.ts       # Browser script
│── tsconfig.json
│── package.json
│── jest.config.js    # Jest config (optional)
```

---

### **5️⃣ Write Your Library Code (`src/index.ts`)**
Example function:

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

---

### **6️⃣ Write Tests (`tests/index.test.ts`)**
Basic Jest test:

```ts
import { greet } from "../src/index";

test("greet function", () => {
  expect(greet("Alice")).toBe("Hello, Alice!");
});
```

Run tests with:

```sh
npx jest
```

---

### **7️⃣ Setup Client for Browser Testing**
#### **HTML File (`client/index.html`):**
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

#### **Client Script (`client/main.ts`):**
```ts
import { greet } from "../src/index";

console.log(greet("World")); // Check the browser console
```

---

### **8️⃣ Start the Browser Test Environment**
Modify `package.json`:

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

Now open your browser, check the console (`F12` or `Ctrl+Shift+I`), and see the output!

---

### **🎉 Done!**
Now you have:
- A **library** (`src/index.ts`)
- **Tests** (`tests/index.test.ts`)
- A **client** to test in the browser (`client/`)

Let me know if you need any tweaks! 🚀

## Fixes needed to chatgpt version, jest.

```sh
npm install --save-dev jest ts-jest @types/jest
```

jest.config.js

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

```sh
npx jest
```
