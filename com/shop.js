const c = "#56312B";
const shop = require("../shop");
const util = require("../util");
module.exports = {
  n: "shop",
  d: "Buy things that raise your CPB!",
  c: async (msg, Discord) => {
    let page = 1;
    let args = msg.content.replace(/^--shop /gi, "");
    if(!isNaN(args)){
      page = args;
    }
    async function market(){
      let user = await util.user(msg.author.tag);
      let userid = msg.author.id;
      let items = util.snippet(shop, page, 5);
      items = items.map((i, ii) => {
        if(user.s[ii+5*page-5] == null) user.s[ii+5*page-5] = 0;
        return '[ '+i.name + ' ]' +
        "[ "+Math.round(i.base*(1+user.s[ii+5*page-5]*i.mult))+" CP ]\n" +
        "<+ "+i.cpb+" CPB> " +
        "<"+user.s[ii+5*page-5]+" owned>"+
        "\n> "+i.desc;
      });
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:c:699750630121668768> Shop! Page: `"+page+"`")
          .setDescription("Page: `"+page+"`\nCP: [ ***"+user.c+"*** ]\n```md\n" +
            (items.length > 0
              ? items.join("\n\n")
              : "[ NO ][ MORE ][ ITEMS ][ FOR ][ SALE ]\n> You've gone far enough!"
            ) +
          "\n```")
          .setFooter("Tip: Use --shop [page] to view that page!")
      ).then(async mesg => {
        // navigation prompt
        if(page > 1) await mesg.react("\u2B05"); // left
        await mesg.react("\u27A1"); // right
        // filter for user
        function filter(reaction, user){
          return ['\u2B05', '\u27A1'].includes(reaction.emoji.name) && user.id == userid;
        }
        // 1 minute prompt
        mesg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(col => {
          // first choice
          const choice = col.first();
          // oooh recursion
          if (choice.emoji.name == '\u2B05') { // left
            page --;
          } else { // right
            page ++;
          }
          mesg.delete();
          market();
        }).catch(e => e)
      });
    }
    market();
  }
}