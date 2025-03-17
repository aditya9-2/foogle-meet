/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { handleConnection, users } from '../server/websocket';

class FakeWebSocket {
    public sentMessages: string[] = [];
    private eventHandlers: { [key: string]: Function[] } = {};

    on(event: string, handler: Function) {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        this.eventHandlers[event].push(handler);
    }

    send(data: string) {
        this.sentMessages.push(data);
    }

    trigger(event: string, data: string | Buffer) {
        (this.eventHandlers[event] || []).forEach(handler => handler(data));
    }
}

describe('WebSocket Tests', () => {
    let ws1: FakeWebSocket;
    let ws2: FakeWebSocket;

    beforeEach(() => {
        users.length = 0;
        ws1 = new FakeWebSocket();
        ws2 = new FakeWebSocket();
        handleConnection(ws1 as unknown as any);
        handleConnection(ws2 as unknown as any);
        ws1.sentMessages = [];
        ws2.sentMessages = [];
    });

    test('sends CONNECTED message on connect', () => {
        const newWS = new FakeWebSocket();
        handleConnection(newWS as any);

        expect(newWS.sentMessages).toContain(
            JSON.stringify({ type: 'CONNECTED', message: 'WebSocket connected' })
        );
    });

    test('handles JOIN_MEETING and notifies other users', () => {
        ws1.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user1', name: 'Alice' }
        }));

        expect(ws1.sentMessages).toContain(
            JSON.stringify({ type: 'JOIN_SUCCESS', roomId: 'room1' })
        );

        ws1.sentMessages = [];
        ws2.sentMessages = [];

        ws2.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user2', name: 'Bob' }
        }));

        expect(ws2.sentMessages).toContain(
            JSON.stringify({ type: 'JOIN_SUCCESS', roomId: 'room1' })
        );
        expect(ws1.sentMessages).toContain(
            JSON.stringify({
                type: 'USER_JOINED',
                payload: { roomId: 'room1', userId: 'user2', name: 'Bob' }
            })
        );
    });

    test('handles LEAVE_MEETING and notifies other users', () => {
        ws1.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user1', name: 'Alice' }
        }));

        ws2.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user2', name: 'Bob' }
        }));

        ws1.sentMessages = [];
        ws2.sentMessages = [];

        ws1.trigger('message', JSON.stringify({
            type: 'LEAVE_MEETING',
            payload: { roomId: 'room1', userId: 'user1' }
        }));

        expect(ws2.sentMessages).toContain(
            JSON.stringify({
                type: 'USER_LEFT',
                payload: { roomId: 'room1', userId: 'user1' }
            })
        );
    });

    test('handles MESSAGE and sends to correct room', () => {
        ws1.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user1', name: 'Alice' }
        }));

        ws2.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user2', name: 'Bob' }
        }));

        ws1.sentMessages = [];
        ws2.sentMessages = [];

        ws1.trigger('message', JSON.stringify({
            type: 'SEND_MESSAGE',
            payload: { roomId: 'room1', userId: 'user1', message: 'Hello, Bob!' }
        }));

        expect(ws2.sentMessages).toContain(
            JSON.stringify({
                type: 'MESSAGE',
                payload: { roomId: 'room1', userId: 'user1', message: 'Hello, Bob!' }
            })
        );
    });

    test('handles DISCONNECT and removes user from list', () => {
        ws1.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user1', name: 'Alice' }
        }));

        ws2.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user2', name: 'Bob' }
        }));

        expect(users.length).toBe(2);

        ws1.trigger('message', JSON.stringify({ type: 'DISCONNECT', payload: { userId: 'user1' } }));

        expect(users.length).toBe(1);
        expect(users.find((user: { userId: string }) => user.userId === 'user1')).toBeUndefined();
    });

    test('handles TOGGLE_DEVICE and broadcasts to the room', () => {
        ws1.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user1', name: 'Alice' }
        }));

        ws2.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user2', name: 'Bob' }
        }));

        // Clear messages so we only see new ones
        ws1.sentMessages = [];
        ws2.sentMessages = [];

        // Trigger TOGGLE_DEVICE from ws1
        ws1.trigger('message', JSON.stringify({
            type: 'TOGGLE_DEVICE',
            payload: { roomId: 'room1', userId: 'user1', device: 'camera', state: 'on' }
        }));

        // Expect ws2 to receive a DEVICE_TOGGLED broadcast
        expect(ws2.sentMessages).toContain(
            JSON.stringify({
                type: 'DEVICE_TOGGLED',
                payload: { roomId: 'room1', userId: 'user1', device: 'camera', state: 'on' }
            })
        );
    });

    test('handles RAISE_HAND and broadcasts to the room', () => {
        ws1.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user1', name: 'Alice' }
        }));

        ws2.trigger('message', JSON.stringify({
            type: 'JOIN_MEETING',
            payload: { roomId: 'room1', userId: 'user2', name: 'Bob' }
        }));

        // Clear messages so we only see new ones
        ws1.sentMessages = [];
        ws2.sentMessages = [];

        // Trigger RAISE_HAND from ws1 with a boolean flag (true = hand raised)
        ws1.trigger('message', JSON.stringify({
            type: 'RAISE_HAND',
            payload: { roomId: 'room1', userId: 'user1', raised: true }
        }));

        // Expect ws2 to receive a HAND_RAISED broadcast with the boolean flag
        expect(ws2.sentMessages).toContain(
            JSON.stringify({
                type: 'HAND_RAISED',
                payload: { roomId: 'room1', userId: 'user1', raised: true }
            })
        );
    });
});

