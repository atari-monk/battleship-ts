import { greet } from "../src/index";

test("greet function", () => {
    expect(greet("Alice")).toBe("Hello, Alice!");
});
