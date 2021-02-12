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

client.on('voiceStateUpdate', (oldMember, newMember) => {
    const newUserChannel = newMember.channelID;
    //const oldUserChannel = oldMember.channelID;
    const botTestCommandsID = '809620229885526046';
    const dictID = {
        'generalVC': '728393039474851877',
        'sinnersVC': '783130220013944873',
        'schoolWorkVC': '783057081589694516',
        'overwatchVC': '744719590747013180',
        'streamingVC': '729420378656604181',
        'smashVC': '728394091083202723',
        'degenVC': '734047189202108416',
        'animeVC': '728394152630550648',
        'creativeVC': '728394115150119004',
        'AFKVC': '732337262049624094'
    }
    
    console.log(newMember);
    //console.log(newMember.member.joinedTimestamp);

    // Set the channel for the bot to send messages to: bot-test-commands
    //var channel = client.channels.cache.filter((channel) => channel.id === '7809620229885526046').first();

    if(newUserChannel === dictID['generalVC']) {
        client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined General VC!');
    }
    else if(newUserChannel === dictID['sinnersVC']) {
        client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Fucking Sinners VC!');
    }
    else if(newUserChannel === dictID['schoolWorkVC']) {
        client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined School/Work VC!');
    }
    else if(newUserChannel === dictID['overwatchVC']) {
        client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Overwatch VC!');
    }
    else if(newUserChannel === dictID['streamingVC']) {
        client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Streaming VC!');
    }
    else if(newUserChannel === dictID['smashVC']) {
        client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Smash VC!');
    }
    else if(newUserChannel === dictID['degenVC']) {
        client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Degenerates VC!');
    }
    else if(newUserChannel === dictID['animeVC']) {
        client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Anime VC!');
    }
    else if(newUserChannel === dictID['creativeVC']) {
        client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined Creative VC!');
    }
    else if(newUserChannel === dictID['AFKVC']) {
        client.channels.cache.get(botTestCommandsID).send(newMember.member.user.username + ' joined AFK VC!');
    }
});

// Debugging to make sure the bot is active.
client.once('ready', () => {
    console.log('Boyo Bot is here baby!');
})

// This will connect to the discord server and start the bot.
client.login(myArgs[2]);
