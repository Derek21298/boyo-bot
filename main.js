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
});

client.on('message', function(message) {
    client.on('voiceStateUpdate', (oldMember, newMember) => {
        console.log('Inside voiceStateUpdate');
        let newUserChannel = newMember.voiceChannel;
        let oldUserChannel = oldMember.voiceChannel;

        var channel = client.channels.cache.filter((channel) => channel.id === '728393039474851875');

        if(oldUserChannel === 728393039474851877 && newUserChannel !== 783130220013944873) {
                message.channel.send('has joined a voice channel');
        }
        else if( newUserChannel === 783130220013944873) {
            message.channel.send('has left a voice channel');
        }
    });
});

// Debugging to make sure the bot is active.
client.once('ready', () => {
    console.log('Boyo Bot is here baby!');
})

// This will connect to the discord server and start the bot.
client.login(myArgs[2]);
