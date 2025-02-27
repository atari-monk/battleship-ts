# How to start typescript project fast

For simple typescript project where i want a library with code, tests, and client to test it in browser console.

## Init

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

## Needed to change structure

root
-client
-libs
--battleship
-tests
-docs
-docs_pl

```ts
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
