module.exports = {
  name: "invite",
  description:
    "Invite me",
  usage: "invite",
  aliases: [],
  category: "Information",
  run: async (client, message, args, prefix) => {
   
   message.channel.send(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2146958847&scope=bot`);

  }
}