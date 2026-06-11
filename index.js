const bedrock = require('bedrock-protocol');
const http = require('http');

// 1. This dummy server keeps Render's Free Web Service happy!
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Minecraft Bot is running online!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

// 2. Your actual Bedrock Minecraft Bot code
function createBot() {
  console.log('Connecting bot to Bedrock server...');
  
  const client = bedrock.createClient({
    host: 'Pikachu5963.aternos.me', // Put your exact Aternos IP here
    port: 61518,                  // Put your Aternos Port here
    username: 'ServerBot247',     
    offline: true                 
  });

  client.on('join', () => {
    console.log('Success: The Bedrock bot has joined the server!');
  });

  client.on('close', () => {
    console.log('Bot disconnected. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  client.on('error', (err) => {
    console.log('Error:', err.message);
  });
}

createBot();
