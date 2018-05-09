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
const PREFIX = "long ";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  const args = message.content.slice(botconfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "love me ort") {
  	if(message.author.id !== botconfig.ownerID) return;
    const { body } = await superagent
    .get('https://yesno.wtf/api/');
    if(body.answer === 'yes') color = '0x01DF01';
    if(body.answer === 'no') color = '0xFF0000';
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setImage(`${body.image}`)
    message.channel.send(`The magic API says: **${body.answer}**`, {embed});

}
  
  if(command === "info") {
    const dsembed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor('My Discord Info :', message.author.avatarURL)
    .setDescription(":wave: Hello Guy, is me TaMoToJi not JingLOng , Hehe ")
    .addField("Discord Server :", "[Click Here ](https://discord.gg/7mS9GEY)", true)
    .addField("Facebook Account :", "[Click Here ](https://www.facebook.com/healong.533)",true)
    .setImage("https://cdn.discordapp.com/attachments/443385156552622083/443460845171769364/Discord_logo_svg.svg_-1024x348.png")
    .setFooter("Content Me or DM : TaMoToJiᵛᵉʳᶦᶠᶦᵉᵈ林坓龙#5881")
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
  
    if(command === "gif") {
        if (message.author.bot) return;
        if (!args[0]) return message.channel.send("`"+PREFIX+"gif <gname>`");

        gifSearch.random(args[0]).then(
           gifUrl => {

          let randomcolor = ((1 << 24) * Math.random() | 0).toString(16) //Optional
          var embed = new Discord.RichEmbed()
            .setColor(`#${randomcolor}`)
            .setImage(gifUrl)
            message.channel.send(embed);
      });
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
