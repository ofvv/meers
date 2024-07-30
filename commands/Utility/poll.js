const discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
  name: "poll",
  category: "Utility",
  description: "Creating a poll",
  usage: "poll <text>",
  run: async (client, message, args) => {

    if (!args.join(' ')) {
      let embed = new discord.MessageEmbed()
      .setColor(config.err_color)
      .setDescription(`❌ | Please select a text!`);

      return message.channel.send(embed);
    }

    let embed = new discord.MessageEmbed()
    .setColor(config.color)
    .setAuthor(`Poll by ${message.member.displayName}`, message.author.displayAvatarURL())
    .setDescription(args.join(' '));

    message.channel.send(embed).then(m => {
      m.react('👍');
      m.react('👎');
    })

  }
}