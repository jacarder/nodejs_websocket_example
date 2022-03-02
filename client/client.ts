
let ws: WebSocket | null;
function init() {
	if(ws) {
		ws.onerror = ws.onopen = ws.onclose = null;
		ws.close();
	}
	ws = new WebSocket('ws://localhost:8080');
	ws.onopen = () => {
		console.log('Connection opened');
	}
	ws.onmessage = ({data}) => {
		console.log(JSON.parse(data));
	}
	ws.onclose = () => {
		ws = null;
	}
}
init();