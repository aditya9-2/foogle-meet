import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ noServer: true });

interface User {
    ws: import("ws").WebSocket;
    rooms: string[];
    userId: string;
}

const users: User[] = [];

wss.on('connection', function connection(ws) {

    ws.on('message', function message(data: string | Buffer) {
        try {
            const parsedData = JSON.parse(data.toString());

            if (parsedData.type === "JOIN_MEETING") {

                const { roomId, userId, name } = parsedData.payload;

                const user = users.find(u => u.userId === userId);

                if (!user) {

                    users.push({
                        userId,
                        rooms: [roomId],
                        ws
                    });

                } else {
                    if (!user.rooms.includes(roomId)) {

                        user.rooms.push(roomId);
                    }
                }

                users.forEach(u => {
                    if (u.rooms.includes(roomId) && u.ws !== ws) {
                        u.ws.send(JSON.stringify({
                            type: "USER_JOINED",
                            payload: { roomId, userId, name }
                        }));
                    }
                });

                ws.send(JSON.stringify({
                    type: "JOIN_SUCCESS",
                    roomId
                }));
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

    ws.send('something');
});