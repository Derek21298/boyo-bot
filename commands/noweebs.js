module.exports = {
    name: 'noweebs',
    description: 'This sendsa weebs out picture',
    
    execute(message, args) {
        message.channel.send('', {
            files: [
                "./weebs-out.jpeg"
            ]
        });
    }
}