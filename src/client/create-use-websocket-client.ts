import { Context, useContext, useEffect, useRef } from 'react'

/**
 * Creates a custom hook to access the WebSocket client from the provided context.
 *
 * @param WebsocketClientContext - The React Context holding the WebSocket client.
 * @returns A hook that returns the WebSocket client instance.
 *
 * @throws Will throw an error if used outside the WebsocketClientProvider.
 */
export function createUseWebsocketClient(WebsocketClientContext: Context<WebSocket | null>) {
    function useWebsocketClient<T>(events: Record<string, (wsMessage: T) => void>): WebSocket
    function useWebsocketClient<T>(callback: (wsMessage: T) => void, event: string | string[]): WebSocket

    function useWebsocketClient<T>(
        arg1: Record<string, (wsMessage: T) => void> | ((wsMessage: T) => void),
        arg2?: string | string[],
    ): WebSocket {
        const websocketClient = useContext(WebsocketClientContext)

        if (!websocketClient) throw new Error('`useWebsocketClient` must be used within a `<WebsocketClientProvider>`')

        const multipleEventsRef = useRef<Record<string, (wsMessage: T) => void> | null>(null)
        const singleCallbackRef = useRef<((wsMessage: T) => void) | null>(null)
        const eventsRef = useRef<string[] | null>(null)

        useEffect(() => {
            if (typeof arg1 === 'object') {
                multipleEventsRef.current = arg1 as Record<string, (wsMessage: T) => void>
                singleCallbackRef.current = null
            } else {
                singleCallbackRef.current = arg1 as (wsMessage: T) => void
                multipleEventsRef.current = null
            }

            eventsRef.current = arg2 ? (Array.isArray(arg2) ? arg2 : [arg2]) : null
        }, [arg1, arg2])

        useEffect(() => {
            function handleIncomingMessageEvent(message: MessageEvent<{ event: string; payload: T }>) {
                console.log(message)
                let data: { event: string; payload: T } | null = null

                if (typeof message.data === 'string') {
                    try {
                        data = JSON.parse(message.data)
                    } catch {
                        // If the data isn't valid JSON, we skip it
                        return
                    }
                } else {
                    data = message.data
                }

                if (!data?.event) return
                const { event, payload } = data

                if (multipleEventsRef.current) {
                    multipleEventsRef.current[event]?.(payload)
                } else if (singleCallbackRef.current && (!eventsRef.current || eventsRef.current.includes(event))) {
                    singleCallbackRef.current(payload)
                }
            }

            websocketClient.addEventListener('message', handleIncomingMessageEvent)
            return () => websocketClient.removeEventListener('message', handleIncomingMessageEvent)
        }, [])

        return websocketClient
    }

    return useWebsocketClient
}
