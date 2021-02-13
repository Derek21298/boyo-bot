module.exports = { echoFactory: (call, response) => {
  return Object.create({
    name: call,
    description: `A command that replies to ${call} with ${response}`,
    execute: (message, _args) => {
      message.channel.send(response);
    }
  });
}};
