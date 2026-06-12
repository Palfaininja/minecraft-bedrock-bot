const bedrock = require('bedrock-protocol');
const http = require('http');

// Dummy server to keep Render's Free Tier happy
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Minecraft Bot Hub\n');
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Web server listening for uptime pings');
});

function createBot() {
  console.log('Connecting bot to Bedrock server...');
  
  const client = bedrock.createClient({
    host: 'Pikachu5963.aternos.me',      // <-- 1. Put your real Aternos IP here inside quotes
    port: 61518,                  // <-- 2. Put your real 5-digit port here (no quotes)
    username: 'ServerBot247',
    offline: true,
    version: '1.26.23.1',            // <--  3. Make sure this matches your exact Aternos version
    viewDistance: 2               
  });

  client.on('join', () => {
    console.log('Success: The Bedrock bot has joined the server!');
  });

  client.on('close', () => {
    console.log('Disconnected. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  client.on('error', (err) => {
    console.log('Network status:', err.message);
  });
}

// Start the bot loop
createBot();
