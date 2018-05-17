const gifSearch = require("gif-search");
const encode = require('strict-uri-encode');
const snek = require('snekfetch');
const fs = require("fs");
const figlet = require('figlet');
const meme = require('memejs');
const hastebin = require('hastebin-gen');
const randomPuppy = require('random-puppy');
const request = require("request");
const db = require('quick.db');
const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require('./botconfig.json');
const superagent = require('superagent');
const moment = require("moment");
require("moment-duration-format");

const PREFIX = "..";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message => {
  if (message.author !== client.user) return;
  if (!message.content.startsWith(botconfig.prefix)) return; // ignore messages that... you know the drill.
  // We covered this already, yay!
  const params = message.content.split(" ").slice(1);
  if (message.content.startsWith(botconfig.prefix + "prune")) {
    // get number of messages to prune
    let messagecount = parseInt(params[0]);
    // get the channel logs
    message.channel.fetchMessages({
        limit: 100
      })
      .then(messages => {
        let msg_array = messages.array();
        // filter the message to only your own
        msg_array = msg_array.filter(m => m.author.id === client.user.id);
        // limit to the requested number + 1 for the command message
        msg_array.length = messagecount + 1;
        // Has to delete messages individually. Cannot use `deleteMessages()` on selfbots.
        msg_array.map(m => m.delete().catch(console.error));
      });
  }
})


client.on("message", async message => {
  if(message.author.bot) return;
  const args = message.content.slice(botconfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "checkinvite") {
  const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));
  return message.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || "Nobody has an invite link as game name.");
};

  if(command === "discord") {
  	if(message.author.id !== botconfig.ownerID) return;
    message.delete();
    message.channel.send(`**DISCORD** : __**MIRAI KURIYAMA**__\n\n**•  Gaming Server**\n**•  Fun Server**\n**•  Community Server**\n**•  Memes Server**\n\n**[https://discord.gg/PEtdUmm ]**`);
  }

  if(command === "reactsay") {
  message.delete();
  let botmessage = args.join(" ");
    const pollTitle = await message.channel.send(botmessage);
      await pollTitle.react(`444878652090613763`);
      await pollTitle.react(`444873045488697375`);
      await pollTitle.react(`444873046776348679`);
      await pollTitle.react(`444873175747133471`);
      await pollTitle.react(`444873284622745610`);
    const filter = (reaction) => reaction.emoji.name === '444878652090613763';
    const collector = pollTitle.createReactionCollector(filter, { time: 150 });
    const filter1 = (reaction) => reaction.emoji.name === '444873045488697375';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 150 });
    const filter3 = (reaction) => reaction.emoji.name === '444873046776348679';
    const collector3 = pollTitle.createReactionCollector(filter3, { time: 150 });
    const filter4 = (reaction) => reaction.emoji.name === '444873175747133471';
    const collector4 = pollTitle.createReactionCollector(filter4, { time: 150 });
    const filter5 = (reaction) => reaction.emoji.name === '444873284622745610';
    const collector5 = pollTitle.createReactionCollector(filter5, { time: 150 });

};

    if(command === "gif") {
  	if(message.author.id !== botconfig.ownerID) return;
       if (message.author.bot) return;
       if (!args[0]) return message.channel.send("`"+PREFIX+"gif <gname>`");

       gifSearch.random(args[0]).then(
       gifUrl => {
        let randomcolor = ((1 << 24) * Math.random() | 0).toString(16)
        var embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setImage(gifUrl)
        message.channel.send(embed);
        message.delete();
    });
 }
 
  if(command === "meme") {
  	if(message.author.id !== botconfig.ownerID) return;
  meme(function(data) {
  const embed = new Discord.RichEmbed()
  .setTitle(data.title[0])
  .setColor("RANDOM")
  .setImage(data.url[0])
  message.channel.send({embed});
  message.delete();
  })};

  if(command === "info") {
  	if(message.author.id !== botconfig.ownerID) return;
    const dsembed = new Discord.RichEmbed()
    .setColor('#da9fff')
    .setAuthor('My Discord Info :', message.author.avatarURL)
    .setDescription(":wave: Hello Guy, its me TaMoToJi not JingLOng , Hehe ")
    .addBlankField()
    .addField("Discord Server :", "[Click Here ](https://discord.gg/PEtdUmm)", true)
    .addField('Twitter :', "[Click Here](https://twitter.com/tamotoji_)", true)
    .addField("Twitch :", "[Click Here](https://www.twitch.tv/tamotoji__)", true)
    .addField("Facebook Account :", "[Click Here ](https://www.facebook.com/healong.533)",true)
    .setImage('https://cdn.discordapp.com/attachments/364284401497931786/443685673543663618/TAMOTOJI.png')
    .setFooter("Content Me or DM : TaMoToJiᵛᵉʳᶦᶠᶦᵉᵈ林坓龙#5881", message.author.avatarURL)
     message.channel.send(dsembed);
     message.delete();
  }

  if(command === "avatar") {
  	if(message.author.id !== botconfig.ownerID) return;
    let msg = await message.channel.send("Generating avatar...");
    let mentionedUser = message.mentions.users.first() || message.author;

    let avatarEmbed = new Discord.RichEmbed()
    .setImage(mentionedUser.displayAvatarURL)
    .setColor(`RANDOM`)
    .setTitle(`Avatar`)
    .setDescription("[Avatar Link]("+mentionedUser.displayAvatarURL+")")
    message.channel.send(avatarEmbed)
    message.delete();
}
  
  if(command === "say") {
  	if(message.author.id !== botconfig.ownerID) return;
    const embed1 = new Discord.RichEmbed()
    .setDescription(args.join(" "))
    .setColor('RANDOM')
     message.delete().catch(O_o=>{});
     message.channel.send(embed1);
    }
  
    if(command === "ping") {
  	if(message.author.id !== botconfig.ownerID) return;
    const newemb = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`🏓 Pong | ${Date.now() - message.createdTimestamp} ms`)
    message.channel.send({embed: newemb})
    message.delete();
}

    if(command === "ascii") {
  	if(message.author.id !== botconfig.ownerID) return;
  message.delete()
  if(args.join(' ').length > 14) return message.channel.send('Only 14 characters are admitted!') 
  if (!args.join(' ')) return message.channel.send('Please, provide text to format in ASCII! Usage: ascii <text>').then(msg => msg.delete({timeout: 10000})); 
    figlet(args.join(' '), (err, data) => {
      message.channel.send('```' + data + '```')
    })
};
   
   if(command === "poll") {
 	if(message.author.id !== botconfig.ownerID) return;
  if (!args.join(' ')) return message.channel.send('Usage: poll <title>').then(msg => msg.delete({timeout: 100}));
   message.delete();
  const embed = new Discord.RichEmbed()
    .setTitle(args.join(' '))
    .setColor('RANDOM')
    const pollTitle = await message.channel.send({ embed });
      await pollTitle.react(`👍`);
      await pollTitle.react(`❤`);
      await pollTitle.react(`☺`);
      await pollTitle.react(`🎉`);
      await pollTitle.react(`💯`);  
    const filter = (reaction) => reaction.emoji.name === '👍';
    const collector = pollTitle.createReactionCollector(filter, { time: 1500 });
    const filter1 = (reaction) => reaction.emoji.name === '❤';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 1500 });
    const filter3 = (reaction) => reaction.emoji.name === '☺';
    const collector3 = pollTitle.createReactionCollector(filter3, { time: 1500 });
    const filter4 = (reaction) => reaction.emoji.name === '🎉';
    const collector4 = pollTitle.createReactionCollector(filter4, { time: 1500 });
    const filter5 = (reaction) => reaction.emoji.name === '💯';
    const collector5 = pollTitle.createReactionCollector(filter5, { time: 1500 });

    message.delete();
};

});

client.login(process.env.BOT_TOKEN);
