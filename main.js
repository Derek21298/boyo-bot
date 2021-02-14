const Discord = require('discord.js');
const fs = require('fs');

const { echoFactory } = require("./lib/echo.js");

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

// Add new "call response" type commands in this list
// With the syntax [<command>, <response>, <response image | null>]
[
  ["ping", "pong", null],
  ["yep", "cock.", "YEPCOCK.jpg"],
  ["cock", "yep", null],
  ["ayaya", "AYAYAYAYAYAYAYA", "ayaya-emote.png"],
  ["noweebs", "", "weebs-out.jpeg"]
].forEach(([call, response, image]) => {
  client.commands.set(call, echoFactory(call, response, image));
});

// When a message is sent, check if the message has the '<>' prefix then execute the command.
client.on('message', message => {
  //console.log(message);
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // Slice the prefix from the command and make lowercase 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
      client.commands.get(command).execute(client, message, args);
    } else {
      console.log(`Could not find command ${command}`);
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
