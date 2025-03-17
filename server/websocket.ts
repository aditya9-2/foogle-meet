import { WebSocketServer, WebSocket } from 'ws';

export const wss = new WebSocketServer({ noServer: true });

export interface User {
    ws: WebSocket
    rooms: string[];
    userId: string;
}

export enum Device {
    Microphone = "microphone",
    Camera = "camera"
}

export enum State {
    On = "on",
    Off = "off",
    Raised = "raised"
}

export const users: User[] = [];

export function handleConnection(ws: WebSocket) {
    ws.on('message', function message(data: string | Buffer) {
        try {
            const parsedData = JSON.parse(data.toString());

            if (parsedData.type === "JOIN_MEETING") {
                const { roomId, userId, name } = parsedData.payload;
                const existingUser = users.find(u => u.userId === userId);

                if (!existingUser) {
                    // Add new user
                    users.push({
                        userId,
                        rooms: [roomId],
                        ws
                    });
                } else {
                    // Add room if not already present
                    if (!existingUser.rooms.includes(roomId)) {
                        existingUser.rooms.push(roomId);
                    }
                }

                // Notify others in the same room
                users.forEach(u => {
                    if (u.rooms.includes(roomId) && u.ws !== ws) {
                        u.ws.send(JSON.stringify({
                            type: "USER_JOINED",
                            payload: { roomId, userId, name }
                        }));
                    }
                });

                // Acknowledge the join
                ws.send(JSON.stringify({
                    type: "JOIN_SUCCESS",
                    roomId
                }));
            }

            else if (parsedData.type === "LEAVE_MEETING") {
                const { roomId, userId } = parsedData.payload;
                const user = users.find(u => u.userId === userId);
                if (!user) return;

                // Remove this room from the user's list
                user.rooms = user.rooms.filter(rId => rId !== roomId);

                // If user has no rooms left, remove from the global array
                if (user.rooms.length === 0) {
                    const index = users.findIndex(u => u.userId === userId);
                    if (index !== -1) {
                        users.splice(index, 1);
                    }
                }

                // Notify others in the same room
                users.forEach(u => {
                    if (u.rooms.includes(roomId) && u.ws !== ws) {
                        u.ws.send(JSON.stringify({
                            type: "USER_LEFT",
                            payload: { roomId, userId }
                        }));
                    }
                });
            }

            // // This matches the TEST which sends { type: "MESSAGE", ... }
            // else if (parsedData.type === "SNED_MESSAGE") {
            //     const { roomId, userId, text } = parsedData.payload;

            //     // Broadcast as "NEW_MESSAGE" so the test matches
            //     users.forEach(u => {
            //         if (u.rooms.includes(roomId)) {
            //             u.ws.send(JSON.stringify({
            //                 type: "NEW_MESSAGE",
            //                 payload: { roomId, userId, text }
            //             }));
            //         }
            //     });
            // }

            else if (parsedData.type === "SEND_MESSAGE") {
                const { roomId, userId, message } = parsedData.payload;
                users.forEach(u => {
                    if (u.rooms.includes(roomId)) {
                        u.ws.send(JSON.stringify({
                            type: "MESSAGE",
                            payload: { roomId, userId, message }
                        }));
                    }
                });
            }

            else if (parsedData.type === "DISCONNECT") {
                const { userId } = parsedData.payload;
                const index = users.findIndex(u => u.userId === userId);
                if (index !== -1) {
                    users.splice(index, 1);
                }
            }

            // Example toggling device
            else if (parsedData.type === "TOGGLE_DEVICE") {
                const { roomId, userId, device, state } = parsedData.payload;

                // Fix the enum check using Object.values(...)
                if (
                    !Object.values(Device).includes(device) ||
                    !Object.values(State).includes(state)
                ) {
                    ws.send(JSON.stringify({
                        type: "error",
                        message: "Invalid device or state"
                    }));
                    return;
                }

                users.forEach(u => {
                    if (u.rooms.includes(roomId)) {
                        u.ws.send(JSON.stringify({
                            type: "DEVICE_TOGGLED",
                            payload: { roomId, userId, device, state }
                        }));
                    }
                });
            }

            // RAISE_HAND
            else if (parsedData.type === "RAISE_HAND") {
                const { roomId, userId, raised } = parsedData.payload;

                if (typeof raised !== "boolean") {
                    ws.send(JSON.stringify({
                        type: "error",
                        message: "Invalid raised flag"
                    }));
                    return;
                }

                users.forEach(u => {
                    if (u.rooms.includes(roomId)) {
                        u.ws.send(JSON.stringify({
                            type: "HAND_RAISED",
                            payload: { roomId, userId, raised }
                        }));
                    }
                });
            }

        } catch (error) {
            console.error("Error processing message:", error);
            console.log("Received invalid data:", data.toString());

            ws.send(JSON.stringify({
                type: "error",
                message: "Invalid JSON format"
            }));
        }
    });

    ws.send(JSON.stringify({ type: "CONNECTED", message: "WebSocket connected" }));
}

wss.on('connection', handleConnection);
