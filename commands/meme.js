module.exports = {
    name: 'meme',
    description: 'This finds a random meme in the meme chat and will post it',
    
    execute(client, message, args) {
        // Get the meeeeme text channel
        channel = client.channels.cache.get('728393897914400791');

        // Fetch the last # amount of memes from the text channel
        channel.messages.fetch({ limit: 10 }).then(messages => {

          // Pick a random meme from the list of memes
          randomMeme = messages.random();

          // Send the content (twitter link) of the meme and who authored it
          // TODO: Make the random memes work with images as well as links
          message.channel.send("Old meme from: " + randomMeme.author.username + "\n"  + randomMeme.content);

        })
        .catch(console.error);
    }
}