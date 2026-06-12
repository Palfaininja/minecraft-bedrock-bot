const bedrock = require('bedrock-protocol');
const http = require('http');

// This server gives UptimeRobot a green light every time it visits
const server = http.createServer((req, res) => {
  console.log('UptimeRobot ping received!');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is awake and tracking!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Web server listening on port ${PORT}`);
});

function createBot() {
  console.log('Attempting connection to Bedrock server...');
  
  const client = bedrock.createClient({
    host: 'Pikachu5963.aternos.me', 
    port: 61518,                  // <-- DOUBLE CHECK: Make sure this matches your current Aternos port!
    username: 'ServerBot247',
    offline: true,
    version: '1.26.20',            // The working version trick we used earlier
    viewDistance: 2               
  });

  client.on('join', () => {
    console.log('Success: The Bedrock bot has joined the server!');
  });

  client.on('close', () => {
    console.log('Disconnected. Retrying connection in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  client.on('error', (err) => {
    console.log('Network status message:', err.message);
  });
}

// Start the sequence
createBot();
