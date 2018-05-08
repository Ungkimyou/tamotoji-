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
  
  if(command === "love me ort") {
    const { body } = await superagent
    .get('https://yesno.wtf/api/');
    if(body.answer === 'yes') color = '0x01DF01';
    if(body.answer === 'no') color = '0xFF0000';
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setImage(`${body.image}`)
    message.channel.send(`The magic API says: **${body.answer}**`, {embed});

}
  
  if(command === "avatar") {
    let msg = await message.channel.send("Generating avatar...");
    let mentionedUser = message.mentions.users.first() || message.author;

    let avatarEmbed = new Discord.RichEmbed()
    .setImage(mentionedUser.displayAvatarURL)
    .setColor(`RANDOM`)
    .setTitle(`Avatar`)
    .setDescription("[Avatar Link]("+mentionedUser.displayAvatarURL+")")
    .setFooter(`Requested by ${message.author.tag}`);
    message.channel.send(avatarEmbed)
    msg.delete();
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
    const newemb = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`Ping | ${Date.now() - message.createdTimestamp} ms`)
    message.channel.send({embed: newemb})
}

    if(command === "commands") {
     const helpembed = new Discord.RichEmbed()
     .setColor('RANDOM')
     .setAuthor('KimYou Commands Here :', "https://cdn.discordapp.com/avatars/364281906898141184/be03ebaac963958654c8b102d6d2b694.png?size=2048")
     .setDescription("**Avatar : Check User Avatar**\n\n**Ping : Pong**\n\n**Meme : Random Meme Image**\n\n**Love me ort : Chech Long Love You Or No**")
     .setFooter("Create By : TaMoToJiᵛᵉʳᶦᶠᶦᵉᵈ林坓龙#5881", "https://cdn.discordapp.com/avatars/364281906898141184/be03ebaac963958654c8b102d6d2b694.png?size=2048")
     message.channel.send(helpembed);
     message.react("📥")
 }
    
    if(command === "meme") {
     meme(function(data) {
    const embed = new Discord.RichEmbed()
   .setTitle(data.title[0])
   .setColor("RANDOM")
   .setImage(data.url[0])
   message.channel.send({embed});
  })};


});

client.login(botconfig.token);
