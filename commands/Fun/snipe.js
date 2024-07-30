const discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
  name: "snipe",
  aliases: ["ms", "messagesnipe"],
  category: "Fun",
  usage: "snipe",
  description: "Get deleted messages",
  run: async (client, message, args) => {
    
    let msg = client.snipes.get(message.channel.id)

    if(!msg) {
      let embed = new discord.MessageEmbed()
      .setColor(config.err_color)
      .setDescription(`❌ | There are no deleted messages in this channel!`);

      return message.channel.send(embed);
    }

    let embed = new discord.MessageEmbed()
    .setColor(config.color)

    if (msg.author) embed.setAuthor(msg.author);

    if (msg.content) embed.setDescription(msg.content);

    if (msg.image) embed.setImage(msg.image);
    
    message.channel.send(embed)
    
  }
}