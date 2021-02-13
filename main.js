const Discord = require('discord.js');
const fs = require('fs');

const myArgs = process.argv; 

// Create the Discord Connection
const client = new Discord.Client();

// This is the prefix that must appear before all commands
const prefix = '<>';

// Bot commands are stored in separate js files in ./commands
// Add all js files in ./commands as client commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

// When a message is sent, check if the message has the '<>' prefix then execute the command.
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // Slice the prefix from the command and make lowercase 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // Ping command: Bot replies 'Pong!'
    if(command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    // Sends an AYAYA picture to chat
    else if(command === 'ayaya') {
        client.commands.get('AYAYA').execute(message, args);
    }
    // Sends a "Weebs Out" picture to chat
    else if(command === 'noweebs') {
        client.commands.get('noweebs').execute(message, args);
    }
    // Sends a random meme from the meme chat
    else if(command === 'meme') {
        client.commands.get('meme').execute(client, message, args);
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    client.commands.get('voice-chat-recognition').execute(client, oldMember, newMember);
});

// Debugging to make sure the bot is active.
client.once('ready', () => {
    console.log('Boyo Bot is here baby!');
})

// This will connect to the discord server and start the bot.
client.login(myArgs[2]);
