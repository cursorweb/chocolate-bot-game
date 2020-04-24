const c = "#56312B";
const util = require("../util");
module.exports = {
  n: "craft",
  d: "A list of all the crafting recipes you have! Choose the crafting recipe ***number***",
  c: async (msg, Discord) => {
    let arg = msg.content.replace(/--craft /gi, "").trim();
    let recipestr = "";
    let rcpbk = ["Cookies \u27A1 Sugar Lump", "Sugar Lump \u27A1 Cookies", "50% of cookies \u27A1 +1 to your cpb (must have > 500 cookies)", "x2 (max 1000 cookies) to cookies \u27A1 -1 to your cpb"];
    rcpbk = rcpbk.map((r, i) => (i+1)+". "+r)
    recipestr = rcpbk.join("\n");
    if(msg.content.toLowerCase() == "--craft" || /--craft /gi.test(arg)){
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:c:699750630121668768> Crafting Recipes")
          .setDescription(recipestr)
      );
    }else{
      const user = await util.user(msg.author.tag);
      switch(parseInt(arg)){
        case 1:
        if(user.c >= 100){
          user.c -= 100;
          user.l ++;
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor(c)
              .setTitle("<:c:699750630121668768> Convert *100* cookies to *1* sugar lump!")
              .setDescription("You carefully extract all of the sugar from each of the cookies!\n```diff\n+ 1 Sugar Lump!\n```")
          );
        }else{
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor(c)
              .setTitle("<:p:699750687201820791> No no no!")
              .setDescription("You need more cookies!")
          );
        }
        break;
        case 2:
        if(user.l >= 1){
          user.c += 100;
          user.l --;
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor(c)
              .setTitle("<:c:699750630121668768> Convert *100* cookies to *1* sugar lump!")
              .setDescription("You evenly use up your sugar lump to make sugar cookies!\n```diff\n+ 100 cookies!\n```")
          );
        }else{
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor(c)
              .setTitle("<:p:699750687201820791> No no no!")
              .setDescription("You need more sugar lumps!")
          );
        }
        break;
        case 3:
        if(user.c >= 500){
          user.c *= 1/2;
          user.cpb ++;
          user.c = Math.floor(user.c);
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor(c)
              .setTitle("<:c:699750630121668768> Convert *"+user.c+"* cookies to +1 CPB!")
              .setDescription("You eat so many cookies you have a sugar rush!\n```diff\n+ 1 CPB!\n```")
          );
        }else{
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor(c)
              .setTitle("<:p:699750687201820791> No no no!")
              .setDescription("You need more cookies!")
          );
        }
        break;
        case 4:
        if(user.cpb >= 1){
          let a = user.c > 1000 ? 1000 : user.c;
          user.c += a;
          user.cpb --;
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor(c)
              .setTitle("<:c:699750630121668768> Convert 1 CPB to *"+a+"* cookies!")
              .setDescription("You burp but extra cookies come up... gross... anyways \n```diff\n+ "+a+" cookies!\n```")
          );
        }else{
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor(c)
              .setTitle("<:p:699750687201820791> No no no!")
              .setDescription("You need more cpb!")
          );
        }
        break;
        default:
        msg.channel.send(
          new Discord.MessageEmbed()
            .setColor(c)
            .setTitle("<:p:699750687201820791> Crafting Recipes")
            .setDescription(recipestr)
            
        );
        break;
      }
      util.changeuser(user, msg.author.tag);
    }
  }
};