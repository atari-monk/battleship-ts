# Noting Folder Structure

In Markdown, you can denote a folder structure using a tree-like format with indentation and symbols like:

```plaintext
Project/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   ├── index.js
├── public/
│   ├── index.html
├── README.md
```

- `├──` (branch) represents a file or folder.
- `│   ` (pipe + spaces) represents vertical continuation.
- `└──` (end branch) represents the last item in a directory.

This mimics the output of the `tree` command in terminals.
