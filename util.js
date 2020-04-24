const fetch = require("node-fetch");
const key = process.env.KEY;

let out = {
  bake: async (user) => {
    return await fetch("https://CHOCOLATE-BOT-DATABASE.coder100.repl.co/bake", {
      method: "GET",
      headers: {
        "body": user,
        "db-key": key
      }
    }).then(e=>e.json());
  },
  update: async () => {
    return await fetch("https://CHOCOLATE-BOT-DATABASE.coder100.repl.co/update", {
      method: "GET",
      headers: {
        "db-key": key
      }
    }).then(e=>e.text());
  },
  user: async user => {
    return await fetch("https://CHOCOLATE-BOT-DATABASE.coder100.repl.co/user", {
      method: "GET",
      headers: {
        "body": user,
        "db-key": key
      }
    }).then(e=>e.json());
  },
  newitem: () => {
    fetch("https://CHOCOLATE-BOT-DATABASE.coder100.repl.co/newitem", {
      method: "GET",
      headers: {
        "db-key": key
      }
    }).then(e => e.text());
    return;
  },
  snippet: (arr, page, count) => { // starting from 1
    function c(a,b,c){
      return a < b ? a = b : a > c ? a = c : a = a;
    }
    return arr.slice(c(count*(page-1), 0, arr.length), c(count*page, 0, arr.length));
  },
  leaderboard: async page => {
    let users = await fetch("https://CHOCOLATE-BOT-DATABASE.coder100.repl.co", {
      method: "GET",
      headers: {
        "db-key": key
      }
    }).then(e => e.json());
    let leaders = [];
    for(let u in users){
      let user = users[u];
      leaders.push({ name: u, cookies: user.c });
    }
    leaders.sort((a,b) => {
      return -(a.cookies - b.cookies);
    });
    return out.snippet(leaders, page, 10);
  },
  changeuser: (data, tag) => {
    fetch("https://CHOCOLATE-BOT-DATABASE.coder100.repl.co/changeuser", {
      method: "GET",
      headers: {
        "db-key": key,
        "body": JSON.stringify({
          user: tag,
          data
        })
      }
    }).then(e => e.text());
    return;
  },
  geosum: (a, r, n) => {
    /*
    a = start
    r = inflation
    n = amount
    */
    // Is Math.pow(x,y) faster than x**y?
    return a*((1-Math.pow(r,n))/(1-r));
  }
};

module.exports = out;