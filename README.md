# React WS

A **type-safe**, lightweight WebSocket client for React. Seamlessly integrate real-time communication into your React apps with full TypeScript support—no extra tooling or code generation required.

## Table of Contents
- [Features](#️-features)
- [Installation](#️-installation)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [Liscense](#-license)

## ☑️ Features
- **100% Type-Safe**: Ensure all communication—incoming and outgoing—is fully typed.
- **Minimal Footprint**: No external dependencies. Just pure TypeScript.
- **Zero Build Complexity**: No additional build tools, CLI configurations, or code generation needed. Works seamlessly out of the box.

## 🛠️ Installation

```bash
npm i @simply-justin/react-ws
```

## 🚀 Usage

Inside the layout.(j/t)sx
```typescript
import { WebsocketClientProvider } from '@simply-justin/react-ws'
...

<WebsocketClientProvider url='wss://{YOUR_WEBSOCKET_URL}'>
    {children}
</WebsocketClientProvider>

```

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository.
2. Run `npm install`
3. Implement your changes or additions.

> [!NOTE]
> Don't forget to run the tests before submitting a pull request.

For major changes, please [open an issue](https://github.com/simply-justin/react-ws/issues) first to discuss your proposed modifications.

Make sure to update the tests and documentation as needed.

## 📝 License

This project is licensed under the [MIT License](LICENSE.md).