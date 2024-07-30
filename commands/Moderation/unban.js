const discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: 'unban',
  category: 'Moderation',
  description: '',
  usage: 'unban User#0000',
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission('BAN_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR')) {
      
      let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | You need ban members permission to use this command`);
        
        return message.channel.send(embed);
      }
      
      if (!message.guild.me.hasPermission('BAN_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | I need ban members permission to unban a member`);
        
        return message.channel.send(embed);
      }
    message.guild.fetchBans().then(bans=> {

      if(bans.size == 0) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | This server don't have banned members`);

        return message.channel.send(embed);
      }

      let bUser = bans.find(member => member.user.id === message.content.slice(7)) || bans.find(member => member.user.tag === message.content.slice(7));

      if(!bUser) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | Invalid user tag or this member is not banned`);

        return message.channel.send(embed);
      }

      let embed = new discord.MessageEmbed()
      .setColor(config.color)
      .setAuthor(`Unbanned ${bUser.user.tag}`, bUser.user.displayAvatarURL())
      .setDescription(`**Moderator:** ${message.author.tag}`)
      .setTimestamp()
      .setFooter(message.member.displayName, message.author.displayAvatarURL());

      message.channel.send(embed).catch(e => client.channels.cache.get(config.err_channel).send(`**Error in: ${message.guild.name} (${message.guild.id})**\n\n${e}`))

      message.guild.members.unban(bUser.user).catch(e => client.channels.cache.get(config.err_channel).send(`**Error in: ${message.guild.name} (${message.guild.id})**\n\n${e}`))
      
      })

  }
}