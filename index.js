const bedrock = require('bedrock-protocol');

function createBot() {
  console.log('Connecting bot to Bedrock server...');
  
  const client = bedrock.createClient({
    host: 'Pikachu5963.aternos.me', // Put your exact Aternos IP inside the quotes
    port: 61518,                  // Replace 19132 with your Aternos Port
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
