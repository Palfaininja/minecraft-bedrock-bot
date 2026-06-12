const bedrock = require('bedrock-protocol');
const http = require('http');

// Enhanced web server to keep Render's Free Web Tier completely stable
const server = http.createServer((req, res) => {
  console.log(`Received ping on path: ${req.url}`);
  res.writeHead(200, { 
    'Content-Type': 'text/plain',
    'Connection': 'keep-alive'
  });
  res.end('Minecraft Bot Hub is Online and Healthy!\n');
});

// Listen on the port Render assigns us
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Web server successfully bound to port ${PORT}`);
});

function createBot() {
  console.log('Connecting bot to Bedrock server...');
  
  const client = bedrock.createClient({
    host: 'Pikachu5963.aternos.me', 
    port: 61518,                  
    username: 'ServerBot247',
    offline: true,
    version: '1.26.20',            // Tricking the server to bypass 1.26.23 sub-version check
    viewDistance: 2               
  });

  client.on('join', () => {
    console.log('Success: The Bedrock bot has joined the server!');
  });

  client.on('close', () => {
    console.log('Disconnected from Minecraft. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  client.on('error', (err) => {
    console.log('Network status error:', err.message);
  });
}

// Start the bot loop
createBot();
