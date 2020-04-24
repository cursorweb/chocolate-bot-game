module.exports = {
  /*
  
  */
  com: [{
    n: "maintain-chocolate",
    c: (msg, Discord, client) => {
      client.on('message', msg => {
        if(msg.author.id != client.user.id && msg.content.indexOf("hehe") > -1) msg.channel.send("hehe")
      });
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor("#56312B")
          .setTitle("<:c:699707572793376779> Maintainence")
          .setDescription("Thank you for maintaining Chocolate!\nGuilds: "+client.guilds.cache.size)
          .addField("__**HehE**__", 'Enjoy this HehE code! (Auto-implemented)\n```js\nclie--eval nt.on("message", msg => { if(msg.author.id != client.user.id && msg.content.indexOf("hehe") > -1) msg.channel.send("hehe") });\n```')
      );
    }
  },],
  allow: ["456220387148169236", "688889174912401417"]
};