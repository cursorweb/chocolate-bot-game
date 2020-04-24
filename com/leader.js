const c = "#56312B";
const util = require("../util");
module.exports = {
  n: "leaders",
  d: "Leaderboard!",
  c: async (msg, Discord) => {
    let arg = msg.content.replace(/^--leaders /gi, "").trim();
    let page = /\d+/g.test(arg)?arg:1;
    async function show(){
      // array of leaders on page
      let output = await util.leaderboard(page);
      // user id for isolation on reaction
      let userid = msg.author.id;
      // leader messageEmbed fields
      let fields = [];
      // appened to field
      output.forEach((o, i) => {
        fields.push({
          name: "\u200b",
          value: (i+10*page-9)+". `"+o.name+"`: ***"+o.cookies.toLocaleString()+"***",
          inline: true
        });
      });
      // mesage embed
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(c)
          .setTitle("<:p:699750687201820791> Leaderboard!")
          .setDescription("Top players! Page: `"+page+"`")
          .addFields(fields.length > 0 ? fields : [{ name:"Empty page", value: "No users here!" }])
          .setFooter("Tip: Use --leaders [page] to view that page!")
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
          show();
        }).catch(e => e)
      });
    }
    show();
  }
};