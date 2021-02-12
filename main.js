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
});

client.on('message', function(message) {
    client.on('voiceStateUpdate', (oldMember, newMember) => {
        console.log('Inside voiceStateUpdate');
        let newUserChannel = newMember.channelID;
        let oldUserChannel = oldMember.channelID;

        //console.log(newMember.);

        // Set the channel for the bot to send messages to: bot-test-commands
        var channel = client.channels.cache.filter((channel) => channel.id === '7809620229885526046').first();

        if(newUserChannel === '728393039474851877') {
                message.channel.send(newMember.member.user.username + ' joined General Voice Chat!');
        }
        else if(newUserChannel === '783130220013944873') {
            message.channel.send(newMember.member.user.username + ' joined Fucking Sinners Voice Chat!');
        }
    });
});

// Debugging to make sure the bot is active.
client.once('ready', () => {
    console.log('Boyo Bot is here baby!');
})

// This will connect to the discord server and start the bot.
client.login(myArgs[2]);
