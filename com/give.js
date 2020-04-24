const c = "#56312B";
const util = require("../util");
module.exports = {
  n: "give",
  d: "Give someone one of your items! `cookies`, `lumps`\nExample:\n```yaml\n--give Hithere#6537 lumps 10\n```",
  c: async (msg, Discord) => {
    let args = msg.content.split(" ");
    let self = await util.user(msg.author.tag);
    args.splice(0, 1);
    if(typeof self.c == "undefined"){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:p:699750687201820791> ERROR!")
          .setDescription("You need to have a profile!")
      );
      return;
    }
    if(args.length < 3){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:p:699750687201820791> ERROR!")
          .setDescription("You need to provide 3 arguments!\n```yaml\n--give [user tag e.g. Hithere#6537] [item e.g. lumps] [amount e.g. 10]\n```")
      );
      return;
    }
    if(args[0] == msg.author.tag){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:p:699750687201820791> ERROR!")
          .setDescription("You cannot give items to yourself!")
      );
      return;
    }
    let user = await util.user(args[0]);
    if(typeof user.c == "undefined"){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:p:699750687201820791> ERROR!")
          .setDescription("User "+args[0]+" does not exist!")
      );
      return;
    }
    let item = args[1].toLowerCase();
    let amount = args[2];
    let rec = await util.user(args[0]);
    if(typeof rec.c == "undefined"){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:p:699750687201820791> ERROR!")
          .setDescription("Reciver must have a profile!")
      );
      return;
    }
    if(isNaN(amount) || !isFinite(amount)){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:p:699750687201820791> ERROR!")
          .setDescription("Amount must be a number!")
      );
      return;
    }
    amount = parseInt(amount);
    let allowedItems = [{k: "sugar lumps", n: "l"}, {k: "cookies", n: "c"}];
    if(amount < 0){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:p:699750687201820791> ERROR!")
          .setDescription("Amount must be greater than 0!")
      );
      return;
    }
    let successfulFind = false;
    let choice;
    for(it of allowedItems){
      if(it.k.indexOf(item) > -1){
        let key = it.n;
        let nme = it.k;
        choice = nme;
        if(self[key] < amount){
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor(c)
              .setTitle("<:p:699750687201820791> ERROR!")
              .setDescription("You need more "+nme+"!")
          );
          return;
        }
        self[key] -= amount;
        rec[key] += amount;
        successfulFind = true;
        break;
      }
    }
    if(!successfulFind){
      let g = allowedItems.map(f => "<- "+f.k+" >")
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:p:699750687201820791> ERROR!")
          .setDescription("Allowed items:\n```md\n"+g.join("\n")+"\n```")
      );
      return;
    }
    await util.changeuser(self, msg.author.tag);
    await util.changeuser(rec, args[0]);
    msg.channel.send(
      new Discord.MessageEmbed()
        .setColor(c)
        .setTitle("<:p:699750687201820791> Good Samaritan")
        .setDescription("You give "+args[0]+" [ **"+amount+"** ] of your "+choice+". Nice work!")
    );
  }
};