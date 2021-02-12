module.exports = {
    name: 'ping',
    description: 'This is a simple ping-pong command',
    
    execute(message, args) {
        message.channel.send('pong!');
    }
}