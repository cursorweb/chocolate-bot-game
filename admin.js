module.exports = [{
  n: "eval",
  c: (msg, Discord, client) => {
    let output = new Function("client", msg.content.replace(/\--eval /g, ""));
      output(client);
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor("#56312B")
          .setTitle("<:c:699707572793376779> Beep Boop Boop Beep!")
          .setDescription("Successfully evaluated code!")
      );
  }
},{
  n: "update",
  c: (msg, Discord) => {
    require("./util").update();
    msg.channel.send(
      new Discord.MessageEmbed()
        .setColor("#56312B")
        .setTitle("<:c:699707572793376779> Update!")
        .setDescription("Successfully updated schema!")
    );
  }
},{
  n: "new-item",
  c: (msg, Discord) => {
    require("./util").newitem();
    msg.channel.send(
      new Discord.MessageEmbed()
        .setColor("#56312B")
        .setTitle("<:c:699707572793376779> New Item!")
        .setDescription("There's a new item in the store!")
    );
  }
}];