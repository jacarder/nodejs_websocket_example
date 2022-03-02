import express from 'express';
import path from 'path';
import { createServer } from 'http';
import ws, { WebSocketServer } from 'ws';
// serve static folder
const app = express();
app.use('/static', express.static(path.join(__dirname, '../client')));
const server = createServer(app);

const wss = new WebSocketServer({ server })
wss.on('connection', (client) => {
	//	REMOVE This is just test code
	if(wss.clients.has(client)){
		console.log("Client exists", wss.clients.size)
	}
	broadcast(JSON.stringify({clients: wss.clients.size}))
	// END REMOVE
	console.log('Client connected!')
	client.on('message', (msg) => {
		console.log(`Message:${msg}`);
		broadcast(msg)
	})
})
function broadcast(msg: ws.Data) {
	for (const client of wss.clients) {
		if (client.readyState === ws.OPEN) {
			client.send(msg)
		}
	}
}
server.listen(process.argv[2] || 8080, () => {
	console.log(`server listening...`);
})