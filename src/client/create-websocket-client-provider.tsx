import React from "react"

export type WebsocketProviderProps = {
    readonly url: string
    readonly children: React.ReactNode
}

/**
 * Creates a WebSocket client provider component that initializes and manages a WebSocket connection.
 *
 * @param WebsocketClientContext - The React Context used to provide the WebSocket client to child components.
 * @returns A higher-order component (HOC) that wraps its children with the WebSocket provider.
 */
export function createWebsocketClientProvider(WebsocketClientContext: React.Context<WebSocket | null>) {
    /**
     * The WebsocketProvider component initializes the WebSocket client and provides it via context.
     *
     * @param props - The properties required to establish the WebSocket connection and render children.
     * @returns A context provider wrapping the child components with the WebSocket client.
     */
    function WebsocketProvider({ url, children }: WebsocketProviderProps) {
        const socketRef = React.useRef<WebSocket | null>(null)

        /**
         * Memoizes the WebSocket client instance to prevent unnecessary re-initializations.
         * The client is recreated only when one of the dependencies (`url`) changes.
         */
        const WebsocketClient = React.useMemo<WebSocket | null>(() => {
            if (typeof window === 'undefined') return null

            if (socketRef.current) return socketRef.current

            return (socketRef.current = new WebSocket(url))
        }, [url])

        React.useEffect(() => {
            // If the WebSocket client is not open, do not proceed.
            if (WebsocketClient?.readyState !== WebSocket.OPEN) return

            // Cleanup function to close the WebSocket connection when the component unmounts.
            return () => WebsocketClient.close()
        }, [WebsocketClient])

        return <WebsocketClientContext.Provider value={WebsocketClient}>{children}</WebsocketClientContext.Provider>
    }

    /**
     * The WebsocketProviderWrapper component wraps the WebsocketProvider with React's Suspense.
     * This allows for handling loading states gracefully while the WebSocket connection is being established.
     *
     * @param props - The properties required to establish the WebSocket connection and render children.
     * @returns The WebsocketProvider wrapped within a Suspense component.
     */
    return function WebsocketProviderWrapper({ url, children }: WebsocketProviderProps) {
        return (
            <React.Suspense fallback={<div />}>
                <WebsocketProvider url={url}>{children}</WebsocketProvider>
            </React.Suspense>
        )
    }
}
