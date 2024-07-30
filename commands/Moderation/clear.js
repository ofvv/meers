const discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
  name: "clear",
  category: "Moderation",
  description: "Clear messages",
  usage: "clear <number>",
  aliases: ['clean', 'purge'],
  run: async (client, message, args) => {
    
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
      let embed = new discord.MessageEmbed()
      .setColor(config.err_color)
      .setDescription(`❌ | I need kick manage messages to delete messages`);
      
      return message.channel.send(embed);
    }

    if (!args[0]) {
      let embed = new discord.MessageEmbed()
      .setColor(config.err_color)
      .setDescription(`❌ | Please give a number!`);

      return message.channel.send(embed);
    }

    if (isNaN(args[0])) {
      let embed = new discord.MessageEmbed()
      .setColor(config.err_color)
      .setDescription(`❌ | Please give a number!`);

      return message.channel.send(embed);
    }

    let msgs = parseInt(args[0]) + 1;

    let embed = new discord.MessageEmbed()
    .setColor(config.color)
    .setDescription(`✅ | Cleared ${args[0]} messages from this channel!`);
    
    message.channel.bulkDelete(msgs).catch(e => {
      let em = new discord.MessageEmbed()
      .setColor(config.err_color)
      .setDescription(`❌ | I can't delete a 14 days old message`);
      
      message.channel.send(em)
      
    })

    setTimeout(() => { 
      message.channel.send(embed).then(m => {
      if (m.deletable) {
        m.delete()
        }
      })
    })

  }
}