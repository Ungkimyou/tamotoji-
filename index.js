const gifSearch = require("gif-search");
const encode = require('strict-uri-encode');
const snek = require('snekfetch');
const fs = require("fs");
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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  const args = message.content.slice(botconfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "discord") {
  	if(message.author.id !== botconfig.ownerID) return;
    const discord = new Discord.RichEmbed()
    .setColor('869aff')
    .setAuthor("Discord Server :", message.author.avatarURL)
    .setDescription('📌This is My Discord Server : Please Join and Support Now Thank For Support Alway ! 🎉')
    .addBlankField()
    .addField('🔗 Discord Link :', "[Clike Here](https://discord.gg/7mS9GEY) Join Server Now ! 🚀 ")
    .setImage('https://cdn.discordapp.com/attachments/443385156552622083/443460845171769364/Discord_logo_svg.svg_-1024x348.png')
    message.delete();
    message.channel.send(discord);
  }
     
  if(command === "info") {
  	if(message.author.id !== botconfig.ownerID) return;
    const dsembed = new Discord.RichEmbed()
    .setColor('#da9fff')
    .setAuthor('My Discord Info :', message.author.avatarURL)
    .setDescription(":wave: Hello Guy, its me TaMoToJi not JingLOng , Hehe ")
    .addBlankField()
    .addField("Discord Server :", "[Click Here ](https://discord.gg/7mS9GEY)", true)
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
    .setFooter(`Requested by ${message.author.tag}`);
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


});

client.login(botconfig.token);
