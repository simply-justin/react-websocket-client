<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/simply-justin/react-ws/blob/main/assets/logo.png" />
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/simply-justin/react-ws/blob/main/assets/logo.png" />
    <img alt="" height="100px" src="https://github.com/simply-justin/react-ws/blob/main/assets/logo.png" />
  </picture>
  <br />
  A <b>type-safe</b>, lightweight WebSocket client for React. Seamlessly integrate real-time communication into your React apps with full TypeScript support—no extra tooling or code generation required.
</p>

## Table of Contents
- [Features](#️-features)
- [Installation](#️-installation)
- [Usage](#-usage)
- [API Reference](#%EF%B8%8F-api-reference)
    - [`WebsocketClientProvider`](#websocketclientprovider)     
    - [`useWebsocketClient`](#usewebsocketclient)     
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

```jsx
// layout.ts
import { WebsocketClientProvider } from '@simply-justin/react-ws'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
  return (
    <html>
        <body>
            <WebsocketClientProvider url='wss://{WEBSOCKET_URL}'>
                {children}
            </WebsocketClientProvider>
        </body>
    </html>
  )
}
```

```jsx
'use-client'
import { useWebsocketClient } from '@simply-justin/react-ws'

export default function ExamplePage() {
    const websocketClient = useWebsocketClient(() => { console.log("I'm getting called on every incomming message.") })
}
```
## ⚙️ API Reference

#### `WebsocketClientProvider`
#### `useWebsocketClient`

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository.
2. Run `npm install`
3. Implement your changes or additions.

For major changes, please [open an issue](https://github.com/simply-justin/react-ws/issues) first to discuss your proposed modifications and make sure to update the tests and documentation as needed.

> [!NOTE]
> Don't forget to run the tests before submitting a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).
