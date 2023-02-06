module.exports = {
    name: 'meme',
    description: 'This finds a random meme in the meme chat and will post it',
    
    execute(client, message, args) {
        // Get the meeeeme text channel
        channel = client.channels.cache.get('728393897914400791');

        // Fetch the last # amount of memes from the text channel
        channel.messages.fetch({ limit: 100 }).then(messages => {

          // Pick a random meme from the list of memes
          randomMeme = messages.random();

          // if there is no content, the meme is an image
          if(!randomMeme.content) {
              //console.log(randomMeme.attachments.values().next().value.attachment);              ;
              message.channel.send("Old meme from: " + randomMeme.author.username + "\n" + randomMeme.attachments.values().next().value.attachment);
          }
          // Dont send plain text messages from memes (must be a link to meme)
          else if(randomMeme.content.startsWith('http')) {
            message.channel.send("Old meme from: " + randomMeme.author.username + "\n"  + randomMeme.content);
            //console.log(randomMeme.content);
          }
        })
        .catch(console.error);
    }
}