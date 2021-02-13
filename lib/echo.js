module.exports = { echoFactory: (call, response, image) => {
  return Object.create({
    name: call,
    description: `A command that replies to ${call} with ${response}`,
    execute: (_client, message, _args) => {
      console.log(typeof image);
      if (typeof image === "string") {
        message.channel.send(response, {
            files: [
                `./images/${image}`
            ]
        });
      } else {
        message.channel.send(response);
      }
    }
  });
}};