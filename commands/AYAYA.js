module.exports = {
    name: 'AYAYA',
    description: 'This sends the AYAYA emote when used',
    
    execute(message, args) {
        message.channel.send('AYAYAYAYAYAYAYA', {
            files: [
                "./ayaya-emote.png"
            ]
        });
    }
}