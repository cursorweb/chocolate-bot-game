/*
{
  n: "",
  d: "",
  c: (msg, Discord) => {
    //
  }
},
*/
const c = "#56312B";
const shop = require("./shop");
const util = require("./util");
module.exports=[{
  n: "bake",
  d: "Bake a cookie! You might find something cool while baking!",
  c: async (msg, Discord) => {
    let out = await util.bake(msg.author.tag);
    let extras = "";
    if(out.b[0]) extras += "\n```fix\nYour hands unconciously create a cake! +"+Math.round(out.a*2)+" cookies (200%)\n```";
    if(out.b[1]) extras += "\n```diff\n+ Your hands unconciously use too much sugar! (+1 Sugar Lump)\n```";
    msg.channel.send(
      new Discord.MessageEmbed()
        .setColor(c)
        .setTitle("<:c:699750630121668768> Bake Bake Bake!")
        .setDescription(`You bake your heart out!\n*"For a fair days' work, I reward you this sum."*\n+ ***${(out.a).toLocaleString()}***${extras}`)
    );
  }
},{
  n: "prof",
  d: "View your profile!\n**Tip: To view someone else's profile, do `--prof [discordTag]`**\nExample: `--prof Hithere#6537`",
  c: async (msg, Discord) => {
    const user = await util.user(msg.author.tag);
    if(!/^--prof /gi.test(msg.content)){
      if(typeof user.c != 'undefined'){
        let roles = user.b.map(d=>"[ ***"+d+"*** ]");
        roles = roles.join(" ");
        msg.channel.send(
          new Discord.MessageEmbed()
            .setColor(c)
            .setTitle("<:c:699750630121668768> "+msg.author.tag+"'s profile!")
            .setDescription(`***${(user.c).toLocaleString()}*** CP`)
            .addField("Badges", "**Badges: **"+roles)
            .addField("Cookies/Bake", user.cpb, true)
            .addField("Sugar Lumps", user.l)
        );
      }else{
        msg.channel.send(
          new Discord.MessageEmbed()
            .setColor(c)
            .setTitle("<:p:699750687201820791> "+msg.author.tag+" has no profile!")
            .setDescription("You have no profile! Type `--help` to get started!")
        );
      }
    }else{
      let arg = msg.content.replace(/--prof /gi, "").trim();
      let user2 = await util.user(arg);
      if(typeof user2.c != 'undefined'){
        let roles = user2.b.map(d=>"[ ***"+d+"*** ]");
        roles = roles.join(" ");
        msg.channel.send(
          new Discord.MessageEmbed()
            .setColor(c)
            .setTitle("<:c:699750630121668768> "+arg+"'s profile!")
            .setDescription(`***${(user2.c).toLocaleString()}*** CP`)
            .addField("Badges", "**Badges: ** "+roles)
            .addField("Cookies/Bake", user2.cpb, true)
            .addField("Sugar Lumps", user2.l)
        );
      }else{
        msg.channel.send(
          new Discord.MessageEmbed()
            .setColor(c)
            .setTitle("<:p:699750687201820791> "+arg+" has no profile!")
            .setDescription("They have no profile! Encourage them to play!")
        );
      }
    }
  }
},{
  n: "invite",
  d: "Invite the bot to your server and other helpful links!",
  c: (msg, Discord) => {
    msg.channel.send(
      new Discord.MessageEmbed()
        .setColor(c)
        .setTitle("<:p:699750687201820791> Invite link!")
        .setDescription("[Invite link](https://discordapp.com/oauth2/authorize?client_id=699699507998228521&scope=bot&permissions=329792)!\n[Code](https://repl.it/@Coder100/Chocolate-Bot-Game) [@coder100](https://repl.it/@Coder100).\nGithub coming soon!\n[Keep-alive website](https://Chocolate-Bot-Game.coder100.repl.co).")
    );
  }
},
require("./com/leader"), require("./com/craft"),
require("./com/shop"), require("./com/give"), {
  n: "buy",
  d: "Buy an item from the shop!",
  c: async (msg, Discord) => {
    /*
    amount = parseInt(arr[arr.length - 1]) || 1
    if(parseInt(arr[arr.length - 1]))
      arr.pop()
    name = arr.join(" ")
    */
    let user = await util.user(msg.author.tag);
    let choice = msg.content.replace(/^--buy '(.+)'.*/gi, "$1")
    , amount = msg.content.replace(/^--buy '.+'(.+)/gi, "$1")
    , xss = !1;
    amount = isNaN(amount) ? 1 : parseInt(amount);
    if(choice.indexOf("--") > -1){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:c:699750630121668768> ERROR!")
          .setDescription("You need to provide 1 or 2 arguments and the name must be in single quotes (')!")
          .addFields([{
            name: "Example 1",
            value: "```yaml\n--buy 'Rolling Pin' 1\n```",
            inline: true
          },{
            name: "Example 2",
            value: "```yaml\n--buy 'Rolling Pin'\n```",
            inline: true
          }])
      );
      return;
    }
    if(amount <= 0){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:c:699750630121668768> ERROR!")
          .setDescription("Amount to buy must be greater than 0!")
      );
      return;
    }
    for(let i = 0; i < shop.length; i ++){
      let it = shop[i];
      let index = it.name.toLowerCase().indexOf(choice.toLowerCase())
      > -1 ? i : -1;
      if(index > -1){
        let item = shop[index];
        if(isNaN(user.s[index])) user.s[index] = 0;
        let price = Math.round(item.base
          * (1 + user.s[index] * item.mult));
        user.s[index] += amount;
        if(amount*price <= user.c) {
          let price = Math.round(item.base*(1+user.s[index]*item.mult))
          user.c -= util.geosum(price, item.mult, amount);
        } else {
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor(c)
              .setTitle("<:p:699750687201820791> No no no!")
              .setDescription("You need more cookies!\n```yaml\nCookies:  "+user.c+"\nRequired: "+(amount*price)+"\nYou need "+(amount*price-user.c)+" more cookies!\n```")
          );
          return;
        }
        user.cpb += item.cpb*amount;
        xss = true;
        await util.changeuser(user, msg.author.tag);
        msg.channel.send(
          new Discord.MessageEmbed()
            .setColor(c)
            .setTitle("<:c:699750630121668768> Bought " + item.name
            + " x" + amount + "!")
            .setDescription("Your transaction:\n\
            ```diff\n+ "+item.cpb*amount+" CPB\n- "+amount*price+" cookies\nCPB: "+user.cpb.toLocaleString()+"\nCP: "+user.c.toLocaleString()+"\n```")
        );
        break;
      }
    }
    if(!xss){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:p:699750687201820791> ERROR!")
          .setDescription("Hmmm... Can't find [ **"+choice+"** ] !")
      );
    }
  }
}, {
  n: "stats",
  d: "View stats!",
  c: async (msg, Discord, client) => {
    let fields = [{
      n: "Guilds",
      c: client.guilds.cache.size
    }, {
      n: "Uptime",
      c: ((client.uptime / 60000).toFixed(2)).toLocaleString() + " minutes"
    }];
    fields = fields.map(f => ({name: "__**"+f.n+"**__", value: f.c, inline: !0}));
    msg.channel.send(
      new Discord.MessageEmbed()
        .setColor(c)
        .setTitle("<:c:699750630121668768> Stats!")
        .setDescription("View Statistics!")
        .addFields(fields)
    );
  }
}];