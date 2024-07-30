const discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "prefix",
    aliases: ["setprefix"],
    category: "Admin",
    description: "Set a prefix for the message server",
    run: async (client, message, args, prefix) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      
      let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | You need administrator permission to use this command`);
        
        return message.channel.send(embed);
      }
      
    if (!args[0]) {
      let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | You need administrator permission to use this command`);
        
        return message.channel.send(embed);
    }

    if (args[1]) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | Cannot set a double argument`);
      
      return message.channel.send(embed);
    }

    if (args[0].length > 3) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | Cannot set a triple argument`);
      
      return message.channel.send(embed);
    }

    if (args[0] === config.normalPrefix) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | Reseted prefix the prefix for this server`);
      
      db.delete(`prefix_${message.guild.id}`);
      
      return message.channel.send(embed);
    }

    if (args[0].includes("`")) {
      let embed = new discord.MessageEmbed()
      .setDescription(`❌ | This character is banned`)
      .setColor(config.err_color);

      return message.channel.send(embed);
    }

    let embed = new discord.MessageEmbed()
    .setColor(config.color)
    .setDescription(`✅ | The new prefix for this server is: \`${args[0]}\``);
      
    db.set(`prefix_${message.guild.id}`, args[0]);
      
    await message.channel.send(embed);

  }
}