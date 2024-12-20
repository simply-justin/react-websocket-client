import React from 'react'
import { createUseWebsocketClient } from './create-use-websocket-client'
import { createWebsocketClientProvider, WebsocketProviderProps } from './create-websocket-client-provider'

/**
 * Creates and configures a WebSocket client setup, including context, provider, and custom hooks.
 *
 * This function encapsulates the creation of a WebSocket client context, provider component,
 * and associated custom hooks for consuming the WebSocket client within React components.
 *
 * @returns An object containing:
 * - `useWebsocketClient`: A custom hook to access the WebSocket client.
 * - `useScopedWebsocketClient`: A custom hook to access a scoped WebSocket client.
 * - `WebsocketClientProvider`: A React provider component to supply the WebSocket client to the component tree.
 * - `WebsocketClientContext`: The React context for the WebSocket client.
 */
export function createWebsocketClient() {
    /**
     * Creates a React Context for the WebSocket client.
     * The context holds a `WebSocket` instance or `null` if not initialized.
     *
     * @type {Context<WebSocket | null>}
     */
    const WebsocketClientContext: React.Context<WebSocket | null> = React.createContext<WebSocket | null>(null)

    /**
     * Creates a WebSocket client provider component using the provided context.
     * This provider is responsible for initializing the WebSocket connection and
     * making it available to all child components via React Context.
     *
     * @type {React.FC<WebsocketProviderProps>}
     */
    const WebsocketClientProvider: React.FC<WebsocketProviderProps> = createWebsocketClientProvider(WebsocketClientContext)

    /**
     * Creates a custom hook to access the WebSocket client from the context.
     * This hook can be used within any functional component to interact with the WebSocket.
     *
     * @type {() => WebSocket | null}
     */
    const useWebsocketClient = createUseWebsocketClient(WebsocketClientContext)

    return {
        useWebsocketClient,
        WebsocketClientProvider,
    }
}
