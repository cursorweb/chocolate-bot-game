/*
Invite him!
discordapp.com/oauth2/authorize?client_id=699699507998228521&scope=bot&permissions=329792
*/

// Import
const Discord = require('discord.js');

// Require
require("./server")();
const commands = require("./commands");

// Login
const client = new Discord.Client();
const token = process.env.TOKEN;

// Special Commands
const admin = require("./admin");
const special = require("./special");

// Soft Limit: Thanks Naka!
let toBeExec = [];

client.on('ready', () => {
  console.log("Logged  in---", client.user.username);
  client.user.setPresence({
    activity: { name: '--help for help!' },
    status: 'idle'
  });
});

// Game
client.on('message', msg => {
  if(!msg.author.bot){
  // my commands!
  if(/--/g.test(msg.content)){
    for(let com of admin){
      if(msg.content.toLowerCase().indexOf(com.n) > -1){
        if(msg.author.id == "456220387148169236"){
          com.c(msg, Discord, client);
          return;
        }
        msg.reply(
          new Discord.MessageEmbed()
            .setColor("#56312B")
            .setTitle("<:d:699707538568118342> No no no!")
            .setDescription("You can't use this command!")
        );
        break;
      }
    }
  }

  // special commands!
  if(/^--/g.test(msg.content)){
    for(let com of special.com){
      if(msg.content.toLowerCase().indexOf(com.n) > -1){
        if(special.allow.includes(msg.author.id)){
          com.c(msg, Discord, client);
          return;
        }
        msg.reply(
          new Discord.MessageEmbed()
            .setColor("#56312B")
            .setTitle("<:d:699707538568118342> No no no!")
            .setDescription("You can't use this command!")
        );
      }
    }
  }

  // everyone's commands!
  if(/^--/g.test(msg.content)){
    let cmd = msg.content.replace(/^--/g, "").toLowerCase();
    cmd = cmd.toLowerCase();

    if(cmd == "help"){
      let carr = [];
      commands.forEach(c => {
        carr.push({
          name: "**"+c.n+"**",
          value: c.d, inline: true
        });
      })
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor("#56312B")
          .setTitle("Help")
          .setDescription("A list of all my commands.")
          .addFields([{
            name: "Note",
            value: "Commands are case insensitive.", inline: true
          },{
            name: "Note",
            value: "Commands are in the form of \n```yaml\n--[cmd name] [arg1] [arg2] ...\n```", inline: true
          },{ name: "\u200B", value: "\u200B" }])
          .addFields(carr)
      );
    }

    for(const c of commands){
      if(cmd.indexOf(c.n) > -1){
        toBeExec.push({c: c.c, msg, Discord, client});
        break;
      }
    }
  }
  }
});

setInterval(() => {
  toBeExec.forEach(e => {
    e.c(e.msg, e.Discord, e.client);
  });
  toBeExec = [];
}, 500)

client.login(token);

"Logging in...";

// HehE
/*
--eval client.on('message', msg => {
  if(msg.author.id != client.user.id && msg.content.indexOf("hehe") > -1) msg.channel.send("hehe")
});
*/
