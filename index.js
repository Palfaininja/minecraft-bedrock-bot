const bedrock = require('bedrock-protocol');
const http = require('http');

// Free Tier Web Service Server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Minecraft Bedrock Bot is Live!\n');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT);

function createBot() {
  console.log('Sending direct RakNet connection to Aternos...');
  
  const client = bedrock.createClient({
    host: 'Pikachu5963.aternos.me', // 1. Put your Aternos IP here
    port: 61518,             // 2. Put your Aternos Port here 
    username: 'ServerBot247',
    offline: true,
    // Forces the cloud server to talk exactly like a real Bedrock app
    raknetBackend: 'raknet-javascript', 
    skipPing: true           // Tells the bot to stop pinging and skip the firewall block
  });

  client.on('join', () => {
    console.log('Success: The Bedrock bot has cracked the firewall and joined!');
  });

  client.on('close', () => {
    console.log('Connection closed. Retrying in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  client.on('error', (err) => {
    console.log('Network Log:', err.message);
  });
}

createBot();

