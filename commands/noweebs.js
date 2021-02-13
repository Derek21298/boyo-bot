module.exports = {
    name: 'noweebs',
    description: 'This sends a weebs out picture',
    
    execute(message, args) {
        message.channel.send('', {
            files: [
                "./images/weebs-out.jpeg"
            ]
        });
    }
}